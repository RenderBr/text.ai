import * as fs from "node:fs";
import {NextResponse} from "next/server";
import ContactImage from "@/modules/db/schemas/ContactImage";
import connect from "@/modules/db/db";
import {Contact} from "@/modules/db/schemas/Contact";
import VerifyAuthentication from "@/modules/api-utilities/verify_auth";

export async function POST(request: Request) {
    try {
        const authResult = await VerifyAuthentication(request);

        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const {user, body} = authResult;
        
        // get the contact id
        const contactId = body.contactId;
        
        if (!contactId) {
            return NextResponse.json({error: "No contact id provided"}, {status: 400});
        }
        
        
        const type = body.type;
        
        if (!type) {
            return NextResponse.json({error: "No type provided"}, {status: 400});
        }
        
        await connect();
        
        const contact = await Contact.findById(contactId);
        
        if (!contact) {
            return NextResponse.json({error: "Contact not found"}, {status: 404});
        }
        
        if (contact.assignedTo !== user.username) {
            return NextResponse.json({error: "Contact not found"}, {status: 404});
        }
        
        const endpoint = "http://127.0.0.1:7860/sdapi/v1/txt2img";

        const payload = {
            prompt: contact.characteristics?.join(", "),
            sampler_name: "DPM++ 2M",
            steps: 20
        };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        // save to file with base 64 image on data['images'][0]
        const base64Image = data['images'][0];

        const buffer = Buffer.from(base64Image, 'base64');
        
        // create new folder with the contact id
        if (!fs.existsSync(`C:\\Users\\julia\\WebstormProjects\\text_ai\\public\\images\\gens\\${contactId}`)){
            fs.mkdirSync(`C:\\Users\\julia\\WebstormProjects\\text_ai\\public\\images\\gens\\${contactId}`);
        }
        
        const image = await ContactImage.create({
            contactId: contactId,
            type: type,
            url: "invalid rn"
        });
        
        await image.save();

        // save to file
        fs.writeFileSync(`C:\\Users\\julia\\WebstormProjects\\text_ai\\public\\images\\gens\\${contactId}\\${image.id}.png`, buffer);
        
        // update image field
        image.url = `/images/gens/${contactId}/${image.id}.png`;
        
        await image.save();
        
        if (type === "avatar") {
            contact.avatar = image.url;
        }
        
        await contact.save();
        
        return NextResponse.json({success: true});
    }catch (e) {
        console.error(e);
        return NextResponse.json({error: "Failed to generate image"}, {status: 500});
    }
}
