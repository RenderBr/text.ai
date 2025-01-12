"use server"

import ContactCard from "@/components/contact";
import AddContactButton from "@/components/contacts/addButton";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import {Contact} from "@/modules/db/schemas/Contact";
import connect from "@/modules/db/db";

export default async function Page() {
    const user = await UserTokenJwt.getUserFromToken();

    if (!user) {
        return (
            <div>
                <h1>Not logged in.</h1>
            </div>
        )
    }

    await connect();
    
    // get contacts
    const contacts = await Contact.find({assignedTo: user.username});


    return (
        <div className={``}>
            { /* Heading */}
            <div className={`flex`}>
                <h1 className={`text-4xl ml-2 mt-2 mb-4`}>Contacts</h1>
                <div className={`ml-auto`}>
                    <AddContactButton token={user.token}/>
                </div>
            </div>

            { /* Contacts */}
            <ul className={`flex flex-col gap-2`}>
                {contacts.map(contact => {
                    return (
                        <ContactCard key={contact.id} characteristics={contact.characteristics} avatar={contact.avatar} name={contact.name} id={contact.id}/>
                    );
                })}
            </ul>
        </div>
    );
}
