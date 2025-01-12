import {model, models, Schema} from "mongoose";

interface IUser {
    name: string;
    email: string;
    avatar?: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String,  required: true},
    password: {type: String, required: true},
    avatar: String
});

const User = models.User || model<IUser>('User', userSchema);

export default User;