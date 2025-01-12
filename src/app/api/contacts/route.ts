import {NextResponse} from "next/server";
import connect from "@/modules/db/db";
import {Contact} from "@/modules/db/schemas/Contact";
import VerifyAuthentication from "@/modules/api-utilities/verify_auth";

export async function POST(request: Request){
    const authResult = await VerifyAuthentication(request);

    if (authResult instanceof NextResponse) {
        return authResult;
    }

    const {user} = authResult;
    
    await connect();
    
    const contacts = await Contact.find({assignedTo: user.username});
    
    return NextResponse.json({contacts: contacts});
}