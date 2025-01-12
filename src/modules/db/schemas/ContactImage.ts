import {model, models, Schema} from "mongoose";

interface IContactImage {
    contactId: string;
    type: string;
    url: string;
    date: Date;
}

const imageSchema = new Schema<IContactImage>({
    contactId: {type: String, required: true},
    type: {type: String, required: true},
    url: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const ContactImage = models.Image || model<IContactImage>('Image', imageSchema);

export default ContactImage;