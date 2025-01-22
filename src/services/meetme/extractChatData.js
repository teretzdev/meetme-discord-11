// src/services/meetme/extractChatData.js

const puppeteer = require('puppeteer');
const eventEmitter = require('../events/eventEmitter');

/**
 * Extracts chat data from the chat page.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<Array>} The extracted chat data.
 */
async function extractChatData(page) {
    // Replace with actual logic to extract chat data
    const chatData = await page.evaluate(() => {
        const messages = [];
        document.querySelectorAll('.chat-message').forEach(msg => {
            const user = msg.querySelector('.user-name')?.innerText.trim();
            const text = msg.querySelector('.message-text')?.innerText.trim();
            const timestamp = msg.querySelector('.timestamp')?.innerText.trim();

            if (user && text && timestamp) {
                messages.push({
                    user,
                    text,
                    timestamp: new Date(timestamp).toISOString()
                });
            }
        });
        return messages;
    });
    // Emit 'messageFetched' event with the chat data as payload
    eventEmitter.emit('messageFetched', chatData);
    return chatData;
}

module.exports = {
    extractChatData
};