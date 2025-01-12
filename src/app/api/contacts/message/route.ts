import {NextResponse} from "next/server";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import connect from "@/modules/db/db";
import {Contact} from "@/modules/db/schemas/Contact";
import ai from "@/modules/ai/ai";
import {Message} from "@/modules/db/schemas/Message";

export async function POST(request: Request){
    try {

        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json({error: "Invalid JSON body"}, {status: 400});
        }

        if (!body) {
            return NextResponse.json({error: "Missing body"}, {status: 400});
        }

        if (!body.token) {
            return NextResponse.json({error: "Missing token field"}, {status: 400});
        }

        if (!body.message) {
            return NextResponse.json({error: "Missing message field"}, {status: 400});
        }

        const token = body.token;

        // Verify the token
        const user = new UserTokenJwt(token);

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 401});
        }

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
            content: aiResponse?.choices[0].message.content,
            to: user.username,
            from: contact._id,
            read: false,
            time: new Date()
        });

        await aiMessage.save();

        const newMessageHistory = body.messageHistory;
        
        newMessageHistory.push({content: body.message, from: user.username, to: contact.id, time: new Date()});
        newMessageHistory.push({content: aiResponse.choices[0].message.content, from: contact.id, to: user.username, time: new Date()});
        
        return NextResponse.json({success: true, message: message, aiMessage: aiMessage, messageHistory: newMessageHistory});
    }catch (e) {
        console.log(e);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}