// src/agents/aiAgent.js

require('dotenv').config();
const axios = require('axios');

/**
 * AIAgent class to interact with an AI service.
 */
class AIAgent {
    constructor() {
        this.apiKey = process.env.AI_API_KEY;
        this.apiUrl = process.env.AI_API_URL;
        
        if (!this.apiKey || !this.apiUrl) {
            throw new Error('AI API configuration is missing. Please check your environment variables.');
        }
    }

    /**
     * Sends a message to the AI service.
     * @param {string} message - The message to send.
     * @returns {Promise<Object>} The response from the AI service.
     */
    async sendMessage(message) {
        try {
            const openai = require('openai');
            const configuration = new openai.Configuration({
                apiKey: this.apiKey,
            });
            const openaiClient = new openai.OpenAIApi(configuration);

            const response = await openaiClient.createCompletion({
                model: "text-davinci-003",
                prompt: message,
                max_tokens: 150,
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error sending message to AI service:', error);
            throw error;
        }
    }

    /**
     * Fetches responses from the AI service.
     * @returns {Promise<Object>} The responses from the AI service.
     */
    async fetchResponses() {
        try {
            // Assuming fetchResponses is meant to retrieve some form of stored responses or logs
            // This might not be directly applicable with OpenAI, so adjust as needed
            console.warn('fetchResponses method is not implemented for OpenAI API.');
            return [];
        } catch (error) {
            console.error('Error fetching responses from AI service:', error);
            throw error;
        }
    }
}

module.exports = AIAgent;