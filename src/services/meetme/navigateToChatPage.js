// src/services/meetme/navigateToChatPage.js

const puppeteer = require('puppeteer');

/**
 * Navigates to the chat page on MeetMe.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function navigateToChatPage(page) {
    const chatUrl = 'https://www.meetme.com/chat';
    await page.goto(chatUrl, { waitUntil: 'networkidle2' });
}

module.exports = {
    navigateToChatPage
};
