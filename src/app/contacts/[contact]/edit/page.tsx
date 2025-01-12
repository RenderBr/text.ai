import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import { Contact } from "@/modules/db/schemas/Contact";
import EditClientSide from "@/app/contacts/[contact]/edit/EditClientSide";

export default async function EditContact({ params }: { params: Promise<{ contact: string }> }) {
    const contactId = (await params).contact;

    const user = await UserTokenJwt.getUserFromToken();

    if (!user) {
        return (
            <div>
                <h1>Unauthorized</h1>
            </div>
        );
    }

    const contact = await Contact.findOne({ assignedTo: user.username, _id: contactId });

    if (!contact) {
        return (
            <div>
                <h1>Contact not found</h1>
            </div>
        );
    }
    

    return (
        <div>
            <h1 className={`font-bold text-5xl`}>Edit Contact</h1>
            <p className={`text-gray-500`}>You are currently editing: {contact.name}</p>

            <EditClientSide token={user.token} id={contact.id} name={contact.name} characteristics={contact.characteristics} />
        </div>
    );
}
