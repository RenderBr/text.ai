import VerifyAuthentication from "@/modules/api-utilities/verify_auth";
import {NextResponse} from "next/server";
import connect from "@/modules/db/db";
import {Contact} from "@/modules/db/schemas/Contact";
import {Message} from "@/modules/db/schemas/Message";

export async function POST(request: Request){
    const authResult = await VerifyAuthentication(request);
    
    if(authResult instanceof NextResponse){
        return authResult;
    }
    
    const {user, body} = authResult;
    
    if(!body.contactId){
        return NextResponse.json({error: "Missing contactId field"}, {status: 400});
    }
    
    await connect();
    
    const messageContent = body.message;

    if (!messageContent) {
        return NextResponse.json({error: "Missing message field"}, {status: 400});
    }
    
    const newMessage = body.newMessage;
    
    if (!newMessage) {
        return NextResponse.json({error: "Missing newMessage field"}, {status: 400});   
    }
    
    // Find the contact
    const contactId = body.contactId;
    
    if (!contactId) {
        return NextResponse.json({error: "Missing contactId field"}, {status: 400});
    }
    
    const contact = await Contact.findById(contactId);
    
    if (!contact) {
        return NextResponse.json({error: "Contact not found"}, {status: 404});
    }
    
    if (contact.assignedTo !== user.username) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    
    // Find the message
    
    const messageObject = await Message.findOne({content: messageContent});
    
    if (!messageObject) {
        return NextResponse.json({error: "Message not found"}, {status: 404});
    }
    
    // Edit the message
    
    messageObject.content = newMessage;
    
    await messageObject.save();
    
    return NextResponse.json({message: "Message edited"});
}