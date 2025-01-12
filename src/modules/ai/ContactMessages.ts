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
    const now = new Date();
    const sentDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - sentDate.getTime()) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
