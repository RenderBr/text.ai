import {NextResponse} from "next/server";
import connect from "@/modules/db/db";
import {Contact} from "@/modules/db/schemas/Contact";
import ai from "@/modules/ai/ai";
import {Message} from "@/modules/db/schemas/Message";
import VerifyAuthentication from "@/modules/api-utilities/verify_auth";
import {ConvertDBContactMessagesToContactMessages} from "@/modules/ai/ContactMessages";

export async function POST(request: Request){
    try {

        const authResult = await VerifyAuthentication(request);

        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const {user, body} = authResult;

        if (!body.contactId) {
            return NextResponse.json({error: "Missing contactId field"}, {status: 400});
        }

        await connect();

        // Find the contact
        const contact = await Contact.findById(body.contactId);

        if (!contact) {
            return NextResponse.json({error: "Contact not found"}, {status: 404});
        }

        if (contact.assignedTo !== user.username) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        if (!body.messageHistory) {
            return NextResponse.json({error: "Missing messageHistory field"}, {status: 400});
        }

        // Add the message
        const message = await Message.create({
            content: body.message,
            to: contact._id,
            from: user.username,
            read: false,
            time: new Date()
        });

        await message.save();
        
        // ai response
        const aiResponse = await ai.getResponse(`${user.username}: ${body.message}`, body.messageHistory, contact.id, contact.characteristics ?? [], contact.name);


        if (!aiResponse) {
            return NextResponse.json({error: "AI response failure. Contact an admin."}, {status: 500});
        }

        // save the ai response
        const aiMessage = await Message.create({
            content: aiResponse?.message.content,
            to: user.username,
            from: contact._id,
            read: false,
            time: new Date()
        });

        await aiMessage.save();
        
        const currentMessagesFromDatabase = await Message.find({to: contact.id});
        currentMessagesFromDatabase.push(...await Message.find({from: contact.id}));
        
        currentMessagesFromDatabase.sort((a, b) => {
            if (a.time < b.time) {
                return -1;
            }
            if (a.time > b.time) {
                return 1;
            }
            return 0;
        });
        
        const currentMessageHistory = currentMessagesFromDatabase.map(message => {
            return ConvertDBContactMessagesToContactMessages(message);
        });
        
        return NextResponse.json({success: true, message: message, aiMessage: aiMessage, messageHistory: currentMessageHistory});
    }catch (e) {
        console.log(e);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}