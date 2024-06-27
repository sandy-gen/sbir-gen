import axios from "axios";

class ChatGPTService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async getChatGPTResponse(prompt: string, model: string, system_prompt: string): Promise<string> {
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        try {
            const response = await axios.post(
                apiUrl,
                {
                    model: model, // Use the latest model
                    messages: [
                        { role: "system", content: system_prompt },
                        { role: "user", content: prompt },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (
                response.data &&
                response.data.choices &&
                response.data.choices.length > 0
            ) {
                return response.data.choices[0].message.content.trim();
            } else {
                throw new Error("No response from ChatGPT");
            }
        } catch (error) {
            console.error("Error calling ChatGPT:", error);
            throw new Error("Failed to get response from ChatGPT");
        }
    }
}

export default ChatGPTService;
