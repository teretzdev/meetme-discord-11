const { Configuration, OpenAIApi } = require('openai');

/**
     * Fetches responses from the AI service.
     * @param {string} endpoint - The API endpoint to fetch responses from.
     * @returns {Promise<Object>} The responses from the AI service.
     */
    async fetchResponses(endpoint) {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${process.env.AI_API_KEY}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching responses from AI service:', error);
            throw error;
        }
    }

        const configuration = new Configuration({
            apiKey: process.env.AI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
        
        if (!process.env.AI_API_KEY) {
            throw new Error('AI API key is missing. Please check your environment variables.');
        }

            const response = await this.openai.createCompletion({
                model: "text-davinci-003",
                prompt: message,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            });
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error sending message to AI service:', error);
            throw error;
        }