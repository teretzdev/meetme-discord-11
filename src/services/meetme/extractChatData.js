// src/services/meetme/extractChatData.js

import puppeteer from 'puppeteer';
import eventEmitter from '../../events/eventEmitter.js';

/**
 * Extracts chat data from the chat page.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<Array>} The extracted chat data.
 */
async function extractChatData(page) {
    // Replace with actual logic to extract chat data
    const chatData = await page.evaluate(() => {
        const messages = [];
        document.querySelectorAll('.message-item').forEach(msg => {
            messages.push({
                user: msg.querySelector('.message-user').innerText,
                text: msg.querySelector('.message-content').innerText,
                timestamp: msg.querySelector('.message-time').innerText,
            });
        });
        return messages;
    });
    return chatData;
}

export { extractChatData };