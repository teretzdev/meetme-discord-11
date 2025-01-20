// src/services/meetmeService.js

const puppeteer = require('puppeteer');

/**
 * Initializes a Puppeteer browser instance.
 * @returns {Promise<Browser>} The Puppeteer browser instance.
 */
async function initializeBrowser() {
    const browser = await puppeteer.launch({ headless: true });
    return browser;
}

/**
 * Logs into the MeetMe service.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function loginToMeetMe(page) {
    const loginUrl = 'https://www.meetme.com/login';
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    // Updated selectors and added retry logic
    const maxRetries = 3;
    let attempt = 0;
    let loggedIn = false;

    while (attempt < maxRetries && !loggedIn) {
        try {
            await page.type('input[name="username"]', process.env.MEETME_USERNAME);
            await page.type('input[name="password"]', process.env.MEETME_PASSWORD);
            await page.click('button[type="submit"]');

            await page.waitForNavigation({ waitUntil: 'networkidle2' });

            // Check for captcha or login error
            if (await page.$('.captcha') || await page.$('.login-error')) {
                throw new Error('Captcha or login error encountered');
            }

            loggedIn = true;
        } catch (error) {
            console.error(`Login attempt ${attempt + 1} failed:`, error);
            attempt++;
            if (attempt >= maxRetries) {
                throw new Error('Max login attempts reached');
            }
        }
    }
}

/**
 * Navigates to the chat page on MeetMe.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function navigateToChatPage(page) {
    const chatUrl = 'https://www.meetme.com/chat';
    await page.goto(chatUrl, { waitUntil: 'networkidle2' });
}

/**
 * Handles pop-ups that may appear on the page.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function handlePopUps(page) {
    // Example: Close any pop-up if it appears
    const popUpSelector = '.popup-close-button';
    if (await page.$(popUpSelector)) {
        await page.click(popUpSelector);
    }
}

/**
 * Extracts chat data from the chat page.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<Array>} The extracted chat data.
 */
async function extractChatData(page) {
    // Updated logic to extract chat data with error handling
    const chatData = await page.evaluate(() => {
        const messages = [];
        document.querySelectorAll('.message-container').forEach(msg => {
            try {
                messages.push({
                    user: msg.querySelector('.username').innerText,
                    text: msg.querySelector('.text-content').innerText,
                    timestamp: msg.querySelector('.time-stamp').innerText,
                });
            } catch (error) {
                console.error('Error extracting message:', error);
            }
        });
        return messages;
    });
    return chatData;
}

module.exports = {
    initializeBrowser,
    loginToMeetMe,
    navigateToChatPage,
    handlePopUps,
    extractChatData
};