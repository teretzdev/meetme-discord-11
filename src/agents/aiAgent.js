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
            const response = await axios.post(this.apiUrl, {
                apiKey: this.apiKey,
                message: message
            });
            return response.data;
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
            const response = await axios.get(this.apiUrl, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching responses from AI service:', error);
            throw error;
        }
    }
}

module.exports = AIAgent;
