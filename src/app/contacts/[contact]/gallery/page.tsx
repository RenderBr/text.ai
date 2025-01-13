import VerifyAuthentication from "@/modules/api-utilities/verify_auth";
import {NextResponse} from "next/server";
import {Contact} from "@/modules/db/schemas/Contact";

export async function POST(request: Request){
    const authResult = await VerifyAuthentication(request);
    
    if(authResult instanceof NextResponse){
        return authResult;
    }
    
    const {user, body} = authResult;
    
    const {contactId} = body;
    
    if(!contactId){
        return new Response("Missing contactId", {status: 400});
    }
    
    const contact = await Contact.findById(contactId);
    
    if(!contact){
        return new Response("Contact not found", {status: 404});
    }
    
    if (contact.assignedTo !== user.username) {
        return new Response("Unauthorized", {status: 403});
    }
    
    
    
    
    
}