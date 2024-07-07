import axios from 'axios';

class CrewAIService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async getCrewAIResponse(prompt: string): Promise<string> {
        try {
            const response = await axios.post(this.apiUrl, {
                prompt: prompt,
                max_tokens: 150 // Adjust as needed for your use case
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.response) {
                return response.data.response.trim();
            } else {
                throw new Error('No response from CrewAI');
            }
        } catch (error) {
            console.error('Error calling CrewAI:', error);
            throw new Error('Failed to get response from CrewAI');
        }
    }
}

export default CrewAIService;
