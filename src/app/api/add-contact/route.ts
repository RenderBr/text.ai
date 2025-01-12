import { NextResponse } from "next/server";
import { Contact } from "@/modules/db/schemas/Contact";
import connect from "@/modules/db/db";
import VerifyAuthentication from "@/modules/api-utilities/verify_auth";

export async function POST(request: Request) {
    const authResult = await VerifyAuthentication(request);

    if (authResult instanceof NextResponse) {
        return authResult;
    }

    const { user, body } = authResult;

    const contactName = body.contactName;

    if (!contactName) {
        return NextResponse.json({ error: "No contact name provided" }, { status: 400 });
    }

    const characteristics = body.characteristics;

    if (!characteristics) {
        return NextResponse.json({ error: "No characteristics provided" }, { status: 400 });
    }

    await connect();

    const newContact = new Contact({ name: contactName, characteristics: characteristics, assignedTo: user.username });

    await newContact.save();

    // Run the image generation in the background
    (async () => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/img`;

            const payload = {
                contactId: newContact._id,
                type: "avatar",
                token: user.token
            };

            await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (e) {
            console.error("Failed to generate contact image: ", e);
        }
    })();

    return NextResponse.json({ success: true });
}
