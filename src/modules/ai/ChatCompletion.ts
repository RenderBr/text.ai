
export interface ChatCompletion {
    id: string;
    object: string;
    created: Date;
    model: string;
    message: Message
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    },
    system_fingerprint: string;
}

interface Message {
    role: string;
    content: string;
}