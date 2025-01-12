import {Contact} from "@/modules/db/schemas/Contact";
import Image from "next/image";
import connect from "@/modules/db/db";
import ClientSideContactMessaging from "@/app/contacts/[contact]/ClientSideContactMessaging";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import {Message} from "@/modules/db/schemas/Message";
import {ConvertDBContactMessagesToContactMessages} from "@/modules/ai/ContactMessages";

export default async function Page({params}: { params: Promise<{ contact: string }> }) {
    const contactId = (await params).contact;

    const user = await UserTokenJwt.getUserFromToken();

    if (!user) {
        return (
            <div>
                <h1>Unauthorized.</h1>
            </div>
        );
    }

    await connect();
    const existingContact = await Contact.findById(contactId);

    const authorized = existingContact?.assignedTo === user.username;


    if (!existingContact || !authorized) {
        return (
            <div>
                <h1>Contact not found.</h1>
            </div>
        );
    }
    
    let messages = await Message.find({to: existingContact._id});
    messages.push(...await Message.find({from: existingContact._id}));
    
    // sort by date
    messages.sort((a, b) => {
        if (a.time < b.time) {
            return -1;
        }
        if (a.time > b.time) {
            return 1;
        }
        return 0;
    });
    
    messages = messages.map(message => { return ConvertDBContactMessagesToContactMessages(message); });
    
    return (
        <div className={`flex flex-col h-full w-full pb-2`}>
            <div className={`flex w-full border-b border-gray-500 justify-center items-center mb-4`}>
                <Image className={`w-12 h-12 lg:w-20 lg:h-20 border-2 rounded-lg mr-4 mb-4`} width={128} height={128}
                       alt={existingContact.name}
                       src={existingContact.avatar ?? "/images/avatars/default-avatar.png"}/>
                <h1 className={`text-2xl font-bold ml-2 mt-2`}>{existingContact.name}</h1>
                <div className={`ml-auto`}>
                    <button className={`bg-red-500 rounded-lg p-2 text-white`}>Delete</button>
                </div>
            </div>

            <ClientSideContactMessaging messages={messages} contactId={existingContact.id} token={user.token}/>
        </div>
    );

}