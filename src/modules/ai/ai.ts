import {ChatCompletion} from "@/modules/ai/ChatCompletion";
import {ContactMessages} from "@/modules/ai/ContactMessages";

export class AiModule {
    private endpoint: string = "http://localhost:1234/v1/";

    public async getResponse(
        message: string,
        messageHistory: ContactMessages[],
        contactId: string,
        characteristics: string[],
        aiName: string
    ): Promise<ChatCompletion | undefined> {
        const response = await fetch(`${this.endpoint}chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-lexi-uncensored-v2",
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful and engaging human being named ${aiName}. Always provide thoughtful, natural, and human-like responses.${
                            characteristics.length > 0 ? ` The user has these characteristics: ${characteristics.join(", ")}.` : ""
                        } Ensure you are aware of who is speaking by maintaining the conversation's context accurately.`
                    },
                    ...messageHistory
                        .map(message => {
                            if (message.to === contactId) {
                                return {role: "user", content: message.content};
                            } else if (message.from === contactId) {
                                return {role: "assistant", content: message.content};
                            }
                            return undefined;
                        })
                        .filter(Boolean),
                    {role: "user", content: message}
                ],
                temperature: 0.5,
                max_tokens: 2048,
                stream: false
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data as ChatCompletion;
        } else {
            console.error("Failed to fetch response", {
                status: response.status,
                statusText: response.statusText,
                url: `${this.endpoint}chat/completions`
            });
            return undefined;
        }
    }


}

const ai = new AiModule();

export default ai;