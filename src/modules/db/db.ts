import * as mongoose from "mongoose";

let isConnected = false;
export default async function connect() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect('mongodb://localhost:27017/textai')
        isConnected = true;
    }catch (error){
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}
