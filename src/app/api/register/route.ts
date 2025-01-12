import {NextResponse} from "next/server";
import {hash} from "bcrypt";
import User from "@/modules/db/schemas/User";
import connect from "@/modules/db/db";

export async function POST(request: Request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch (error) {
            console.error("Failed to parse request body: ", error);
            return NextResponse.json({error: "Failed to parse request body"}, {status: 400});
        }

        if (!body) {
            return NextResponse.json({error: "Missing request body"}, {status: 400});
        }

        if (!body.username || !body.password || !body.email) {
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }

        // if user exists
        await connect();

        const existingUser = await User.exists({name: body.username});

        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        hash(body.password, 10, async function (err, hash) {
            if (err) {
                throw new Error("Failed to hash password");
            }

            const newUser = await User.create({
                name: body.username,
                password: hash,
                email: body.email
            });

            await newUser.save();

        });
        return NextResponse.json({message: "User registered successfully"}, {status: 201});

    } catch (error) {
        console.error("Error whilst registering: ", error);

        return NextResponse.json({error: "Failed to register user"}, {status: 500});
    }
}