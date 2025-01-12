import VerifyAuthentication from "@/modules/api-utilities/verify_auth";
import {NextResponse} from "next/server";
import {Contact} from "@/modules/db/schemas/Contact";

export async function POST(request:Request){
    const authResult = await VerifyAuthentication(request);
    
    if(authResult instanceof NextResponse){
        return authResult;
    }
    
    const {user,body } = authResult;
    
    const {contactId,contactName,characteristics} = body;
    
    if(!contactId || !contactName || !characteristics){
        return NextResponse.json("Missing required fields");
    }
    
    // get contact
    const contact = await Contact.findById(contactId);
    
    if(!contact){
        return NextResponse.json("Contact not found");
    }
    
    if (contact.assignedTo !== user.username){
        return NextResponse.json("Unauthorized");
    }
    
    contact.name = contactName;
    contact.characteristics = characteristics;
    
    await contact.save();
    
    return NextResponse.json({contact: contact});
    
    
    
}