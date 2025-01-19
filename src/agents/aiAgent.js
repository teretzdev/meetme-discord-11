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
        const maxRetries = 3;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                const response = await axios.post(this.apiUrl, {
                    apiKey: this.apiKey,
                    message: message
                });
                return response.data;
            } catch (error) {
                if (error.response && (error.response.status === 429 || error.response.status >= 500)) {
                    attempt++;
                    const delay = Math.pow(2, attempt) * 1000;
                    console.warn(`Retrying sendMessage due to ${error.response.status} error. Attempt ${attempt} of ${maxRetries}. Waiting ${delay}ms before retry.`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    console.error('Error sending message to AI service:', error);
                    throw error;
                }
            }
        }
        throw new Error('Failed to send message after multiple attempts.');
    }

    /**
     * Fetches responses from the AI service.
     * @returns {Promise<Object>} The responses from the AI service.
     */
    async fetchResponses() {
        const maxRetries = 3;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                const response = await axios.get(this.apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                });
                return response.data;
            } catch (error) {
                if (error.response && (error.response.status === 429 || error.response.status >= 500)) {
                    attempt++;
                    const delay = Math.pow(2, attempt) * 1000;
                    console.warn(`Retrying fetchResponses due to ${error.response.status} error. Attempt ${attempt} of ${maxRetries}. Waiting ${delay}ms before retry.`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    console.error('Error fetching responses from AI service:', error);
                    throw error;
                }
            }
        }
        throw new Error('Failed to fetch responses after multiple attempts.');
    }
}

module.exports = AIAgent;