import {NextResponse} from "next/server";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import VerifyJsonBody from "@/modules/api-utilities/verify_json_body";

export default async function VerifyAuthentication(request: Request){
    const body = await VerifyJsonBody(request);
    
    if (body instanceof NextResponse) {
        return body;
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
    
    return {user, body};
}