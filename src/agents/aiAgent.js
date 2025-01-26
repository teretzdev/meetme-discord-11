// src/agents/aiAgent.js

require('dotenv').config();
const axios = require('axios');
const eventEmitter = require('../events/eventEmitter');

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
     * Listens for 'messageFetched' events and processes messages using AI.
     */
    listenForMessages() {
        eventEmitter.on('messageFetched', async (chatData) => {
            try {
                const processedMessages = await Promise.all(chatData.map(async (message) => {
                    logger.info(`Sending message to AI service: ${message.text}`);
                    const aiResponse = await this.sendMessage(message.text);
                    logger.info(`Received response from AI service: ${aiResponse.processedText}`);
                    return {
                        user: message.user,
                        text: aiResponse.processedText,
                        timestamp: message.timestamp
                    };
                }));
                console.log('Processed messages:', processedMessages);
                eventEmitter.emit('messageProcessed', processedMessages);
            } catch (error) {
                logger.error('Error processing messages:', error.message);
            }
        });
    }

    /**
     * Sends a message to the AI service.
     * @param {string} message - The message to send.
     * @returns {Promise<Object>} The response from the AI service.
     */
    async sendMessage(message) {
        try {
            logger.info(`Sending message to AI service: ${message}`);
            const response = await axios.post(this.apiUrl, {
                apiKey: this.apiKey,
                message: message
            });
            logger.info(`Received response from AI service: ${response.data}`);
            return response.data;
        } catch (error) {
            logger.error('Error sending message to AI service:', error.message);
            throw error;
        }
    }

    /**
     * Fetches responses from the AI service.
     * @returns {Promise<Object>} The responses from the AI service.
     */
    async fetchResponses() {
        try {
            logger.info('Fetching responses from AI service.');
            const response = await axios.get(this.apiUrl, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });
            logger.info('Received responses from AI service.');
            return response.data;
        } catch (error) {
            logger.error('Error fetching responses from AI service:', error.message);
            throw error;
        }
    }
}

module.exports = AIAgent;

// Initialize and start listening for messages
const aiAgent = new AIAgent();
aiAgent.listenForMessages();