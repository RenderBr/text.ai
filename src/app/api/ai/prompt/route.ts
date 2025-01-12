import {NextResponse} from "next/server";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import ai from "@/modules/ai/ai";

export async function POST(request:Request){
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
    
    const response = "placeholder";
    
    if (!response) {
        return NextResponse.json({error: "No response from AI"}, {status: 400});
    }
    
    return NextResponse.json({message: response});
    
}