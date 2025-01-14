import {NextRequest, NextResponse} from "next/server";
import connect from "@/modules/db/db";
import User from "@/modules/db/schemas/User";
import {compare} from "bcrypt";
import UserTokenJwt from "@/modules/auth/UserTokenJwt";
import VerifyJsonBody from "@/modules/api-utilities/verify_json_body";

export async function POST(request: NextRequest) {
    try {
        const bodyResult = await VerifyJsonBody(request);
        
        if (bodyResult instanceof NextResponse) {
            return bodyResult;
        }
        const body = bodyResult;
        
        if (!body.username || !body.password) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }

        // if user exists
        await connect();

        const existingUser = await User.findOne({name: body.username});

        if (!existingUser) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        compare(body.password, existingUser.password, function (err, result) {
            if (err) {
                console.error("Failed to compare passwords: ", err);
                return NextResponse.json({error: "Failed to compare passwords"}, {status: 500});
            }

            if (!result) {
                return NextResponse.json({error: "Invalid password"}, {status: 400});
            }
        });

        const userToken = new UserTokenJwt({email: existingUser.email, username: existingUser.name});

        const token = userToken.generateToken();

        return NextResponse.json({message: "Logged in successfully", token: token}, {status: 200});
    } catch (error) {
        console.error("Error whilst logging in: ", error);
        return NextResponse.json({error: "Failed to login"}, {status: 500});
    }
}