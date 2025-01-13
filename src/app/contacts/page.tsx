"use server"

import ContactCard from "@/components/contacts/contact";
import AddContactButton from "@/components/contacts/addButton";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import { Contact } from "@/modules/db/schemas/Contact";
import connect from "@/modules/db/db";
import { Message } from "@/modules/db/schemas/Message";

export default async function Page() {
    const user = await UserTokenJwt.getUserFromToken();

    if (!user) {
        return (
            <div>
                <h1>Not logged in.</h1>
            </div>
        );
    }

    await connect();

    // Get contacts
    const contacts = await Contact.find({ assignedTo: user.username });

    // Get latest messages for each contact and include timestamp
    const contactsWithMessages = await Promise.all(
        contacts.map(async (contact) => {
            const messages = await Message.find({ from: contact.id }).sort({ time: -1 }).limit(1);
            return {
                ...contact.toObject(),
                latestMessage: messages[0]?.content ?? "",
                latestMessageTime: messages[0]?.time ?? null
            };
        })
    );

    // Sort contacts: latest message first, no messages at the bottom
    const sortedContacts = contactsWithMessages.sort((a, b) => {
        if (a.latestMessageTime && b.latestMessageTime) {
            return b.latestMessageTime - a.latestMessageTime; // Descending order of message time
        }
        if (a.latestMessageTime) return -1; // `a` has a message, `b` does not
        if (b.latestMessageTime) return 1;  // `b` has a message, `a` does not
        return 0; // Both have no messages
    });

    return (
        <div className={``}>
            {/* Heading */}
            <div className={`flex`}>
                <h1 className={`text-4xl lg:text-6xl ml-2 mt-2 mb-4 font-bold select-none`}>Contacts</h1>
                <div className={`ml-auto`}>
                    <AddContactButton token={user.token} />
                </div>
            </div>

            {/* Contacts */}
            <ul className={`flex flex-col gap-2`}>
                {sortedContacts.map((contact) => (
                    <ContactCard
                        token={user.token}
                        key={contact._id.toString()}
                        characteristics={contact.characteristics}
                        avatar={contact.avatar}
                        name={contact.name}
                        id={contact._id.toString()}
                    />
                ))}

                {sortedContacts.length === 0 && (
                    <h2 className={`text-2xl font-bold text-gray-400 self-center select-none`}>You have no contacts yet.</h2>
                )}
            </ul>
        </div>
    );
}
