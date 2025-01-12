import {NextResponse} from "next/server";

export default async function VerifyJsonBody(request: Request){
    let body;
    try {
        body = await request.json();
    }catch {
        return NextResponse.json({error: "Invalid JSON"}, {status: 400});
    }
    
    return body;
} 