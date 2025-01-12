
export interface ChatCompletion {
    id: string;
    object: string;
    created: Date;
    model: string;
    choices: Choice[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    },
    system_fingerprint: string;
}

interface Choice {
    index: number;
    message: Message;
    finish_reason: string;
}

interface Message {
    role: string;
    content: string;
}