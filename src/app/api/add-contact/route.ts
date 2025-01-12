import {NextResponse} from "next/server";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import {Contact} from "@/modules/db/schemas/Contact";
import connect from "@/modules/db/db";

export async function POST(request: Request){
    let body;
    try {
        body = await request.json();
    }catch {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400});
    }
    
    const token = body.token;
    
    if (!token) {
        return NextResponse.json({error: "No token provided"}, {status: 400});
    }
    
    if (!UserTokenJwt.verifyToken(token)) {
        return NextResponse.json({error: "Invalid token"}, {status: 400});
    }
    
    const user = new UserTokenJwt(token);
    
    if (!user) {
        return NextResponse.json({error: "Invalid token"}, {status: 400});
    }
    
    const contactName = body.contactName;
    
    if (!contactName) {
        return NextResponse.json({error: "No contact name provided"}, {status: 400});
    }
    
    const characteristics = body.characteristics;
    
    if (!characteristics) {
        return NextResponse.json({error: "No characteristics provided"}, {status: 400});
    }
    
    await connect();
    
    const newContact = new Contact({name: contactName, characteristics: characteristics, assignedTo: user.username});
    
    await newContact.save();
    
    return NextResponse.json({success: true});
}