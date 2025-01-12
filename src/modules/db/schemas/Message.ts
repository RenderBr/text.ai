import {model, models, Schema} from "mongoose";

interface IMessage {
    content: string;
    from: string;
    to: string;
    read: boolean;
    time: Date;
}

const messageSchema = new Schema<IMessage>({
    content: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    read: {type: Boolean, required: true},
    time: {type: Date, required: true}
});

const Message = models.Message || model<IMessage>('Message', messageSchema);

export {Message};
export type { IMessage };
