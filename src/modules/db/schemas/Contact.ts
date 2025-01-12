import {Model, model, models, Schema} from "mongoose";

export interface IContact {
    name: string;
    characteristics?: string[];
    assignedTo: string;
    avatar?: string;
}

const contactSchema = new Schema<IContact>({
    name: {type: String, required: true},
    characteristics: {type: [String], required: false},
    assignedTo: {type: String, required: true},
    avatar: {type: String, required: false}
});

export const Contact: Model<IContact> = models.Contact || model<IContact>('Contact', contactSchema);
