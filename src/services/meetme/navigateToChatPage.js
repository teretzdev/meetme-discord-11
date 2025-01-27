// src/services/meetme/navigateToChatPage.js

import puppeteer from 'puppeteer';

/**
 * Navigates to the chat page on MeetMe.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function navigateToChatPage(page) {
    const chatUrl = 'https://www.meetme.com/chat';
    await page.goto(chatUrl, { waitUntil: 'networkidle2' });
}

export { navigateToChatPage };