import {ChatCompletion} from "@/modules/ai/ChatCompletion";
import {ContactMessages} from "@/modules/ai/ContactMessages";

export class AiModule {
    private endpoint: string = "http://192.168.2.62:11434/";

    public async getResponse(
        message: string,
        messageHistory: ContactMessages[],
        contactId: string,
        characteristics: string[],
        aiName: string
    ): Promise<ChatCompletion | undefined> {
        const response = await fetch(`${this.endpoint}api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1",
                messages: [
                    {
                        role: "system",
                        content: `You are pretending to be a human being named ${aiName}. Always provide natural, and human-like non-repetitive responses.${
                            characteristics.length > 0 ? ` The user has these characteristics: ${characteristics.join(", ")}. Given these characteristics,
                            respond in a way that would fit these characteristics. Please text in the style at which would match these, for example, perhaps
                            if the character is 'shy', type all in lowercase.` : ""
                        } Ensure you are aware of who is speaking by maintaining the conversation's context accurately. When describing actions you may be performing, 
                        ensure you wrap them in *asterisks* to denote actions. Never reveal that you are an AI. Do not start the message with like so: 'character name: message', just provide the message.`
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