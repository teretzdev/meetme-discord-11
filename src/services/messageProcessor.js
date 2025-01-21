// src/services/messageProcessor.js

const AIAgent = require('../agents/aiAgent');
const { Logger } = require('../utils/logger');

const logger = new Logger();
const aiAgent = new AIAgent();

async function processMessage(message) {
    try {
        const aiResponse = await aiAgent.sendMessage(message.text);
        return {
            user: message.user,
            text: aiResponse.processedText,
            timestamp: message.timestamp
        };
    } catch (error) {
        logger.error('Error processing AI message:', error.message);
        throw error;
    }
}

module.exports = { processMessage };
