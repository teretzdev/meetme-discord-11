import dotenv from 'dotenv';
import axios from 'axios';
import eventEmitter from '../events/eventEmitter.js';
dotenv.config();

/**
 * AIAgent class to interact with an AI service.
 */
class AIAgent {
    /**
     * Constructs an instance of AIAgent.
     * Validates the presence of API key and URL.
     * @throws Will throw an error if the API key or URL is missing.
     */
    constructor() {
        this.apiProvider = process.env.AI_PROVIDER || 'default';
        this.apiKey = process.env.AI_API_KEY;
        this.apiUrl = this.apiProvider === 'LMStudio' ? process.env.LMSTUDIO_API_URL : process.env.AI_API_URL;

        if (!this.apiKey || !this.apiUrl) {
            throw new Error('AI API configuration is missing. Please check your environment variables.');
        }
    }

    /**
     * Listens for 'messageFetched' events and processes messages using AI.
     */
    listenForMessages() {
        eventEmitter.on('messageFetched', async (chatData) => {
            try {
                const processedMessages = await Promise.all(chatData.map(async (message) => {
                    const aiResponse = await this.sendMessage(message.text);
                    return {
                        user: message.user,
                        text: aiResponse.responseText,
                        sentiment: aiResponse.sentiment,
                        timestamp: message.timestamp
                    };
                }));
                console.info('Processed messages successfully:', processedMessages);
                eventEmitter.emit('messageProcessed', processedMessages);
            } catch (error) {
                console.error('Error processing messages:', error.message, error.stack);
            }
        });
    }

    /**
     * Sends a message to the AI service.
     * @param {string} message - The message to send.
     * @returns {Promise<Object>} The response from the AI service.
     */
    /**
     * Sends a message to the AI service.
     * Implements retry logic for transient errors.
     * @param {string} message - The message to send.
     * @returns {Promise<Object>} The response from the AI service.
     * @throws Will throw an error if the message is invalid or if the request fails.
     */
    async sendMessage(message) {
        if (typeof message !== 'string' || message.trim() === '') {
            throw new Error('Invalid message: Message must be a non-empty string.');
        }

        const maxRetries = 3;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                const response = this.apiProvider === 'LMStudio'
                    ? await axios.post(this.apiUrl, { prompt: message })
                    : await axios.post(this.apiUrl, { apiKey: this.apiKey, message: message });
                if (this.apiProvider === 'LMStudio') {
                    console.debug('LMStudio response received:', response.data);
                    const { text: responseText } = response.data;
                    if (typeof responseText !== 'string') {
                        throw new Error('Unexpected response format: Missing responseText.');
                    }
                    return { responseText, sentiment: 'N/A' }; // LMStudio does not provide sentiment
                } else {
                    console.debug('Default AI provider response received:', response.data);
                    const { responseText, sentiment } = response.data;
                    if (typeof responseText !== 'string' || typeof sentiment !== 'string') {
                        throw new Error('Unexpected response format: Missing responseText or sentiment.');
                    }
                    return { responseText, sentiment };
                }
            } catch (error) {
                if (error.response && error.response.status >= 500) {
                    attempt++;
                    console.warn(`Transient error occurred (attempt ${attempt}):`, error.message);
                } else {
                    console.error('Non-retryable error sending message to AI service:', error.message, error.stack);
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
    /**
     * Fetches responses from the AI service.
     * @returns {Promise<Object>} The responses from the AI service.
     * @throws Will throw an error if the request fails.
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
            console.error('Exhausted all retry attempts. Throwing error.');
            throw error;
        }
    }
}

export default AIAgent;