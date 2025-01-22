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
     * Parses incoming messages for processing.
     * @param {Object} message - The message object to parse.
     * @returns {Object} The parsed message.
     */
    parseMessage(message) {
        // Example parsing logic
        return {
            user: message.user.trim(),
            text: message.text.trim(),
            timestamp: new Date(message.timestamp).toISOString()
        };
    }

    /**
     * Listens for 'messageFetched' events and processes messages using AI.
     */
    listenForMessages() {
        eventEmitter.on('messageFetched', async (chatData) => {
            try {
                const processedMessages = await Promise.all(chatData.map(async (rawMessage) => {
                    const message = this.parseMessage(rawMessage);
                    const aiResponse = await this.sendMessage(message.text);
                    return {
                        user: message.user,
                        text: aiResponse.processedText || message.text,
                        timestamp: message.timestamp
                    };
                }));
                console.log('Processed messages:', processedMessages);
                eventEmitter.emit('messageProcessed', processedMessages);
            } catch (error) {
                console.error('Error processing messages:', {
                    message: error.message,
                    stack: error.stack,
                    chatData
                });
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
            const response = await axios.post(this.apiUrl, {
                apiKey: this.apiKey,
                message: message
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message to AI service:', {
                message: error.message,
                stack: error.stack,
                requestData: { message }
            });
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

// Initialize and start listening for messages
const aiAgent = new AIAgent();
aiAgent.listenForMessages();