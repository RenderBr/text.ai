import {IMessage} from "@/modules/db/schemas/Message";

export interface ContactMessages {
    content: string;
    from: string;
    to: string;
    read: boolean;
    time: Date;
}

export function ConvertDBContactMessagesToContactMessages(dbContactMessages: IMessage): ContactMessages {
    return {
        content: dbContactMessages.content,
        from: dbContactMessages.from,
        to: dbContactMessages.to,
        read: dbContactMessages.read,
        time: dbContactMessages.time
    };
}

export function GetMessageDateString(date: Date): string {
    return date.toLocaleString();
}