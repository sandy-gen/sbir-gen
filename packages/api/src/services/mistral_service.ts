import axios from 'axios';

class MistralService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async getMistralResponse(prompt: string): Promise<string> {
        try {
            const response = await axios.post(this.apiUrl, {
                prompt: prompt,
                max_tokens: 150 // Adjust as needed for your use case
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].text.trim();
            } else {
                throw new Error('No response from Mistral');
            }
        } catch (error) {
            console.error('Error calling Mistral:', error);
            throw new Error('Failed to get response from Mistral');
        }
    }
}

export default MistralService;
