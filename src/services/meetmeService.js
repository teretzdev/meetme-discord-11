```javascript
// src/services/meetmeService.js

const puppeteer = require('puppeteer');

/**
 * Initializes a Puppeteer browser instance.
 * @returns {Promise<Browser>} The Puppeteer browser instance.
 */
async function initializeBrowser() {
    const browser = await puppeteer.launch({ 
        headless: process.env.PUPPETEER_HEADLESS === 'true',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1280, height: 800 }
    });
    return browser;
}

/**
 * Logs into the MeetMe service.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function loginToMeetMe(page) {
    const loginUrl = 'https://www.meetme.com/login';
    try {
        console.log('Navigating to login page...');
        await page.goto(loginUrl, { waitUntil: 'networkidle2' });

        console.log('Entering username...');
        await page.type('#username', process.env.MEETME_USERNAME);

        console.log('Entering password...');
        await page.type('#password', process.env.MEETME_PASSWORD);

        console.log('Clicking login button...');
        await page.click('#loginButton');

        console.log('Waiting for navigation after login...');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Logged into MeetMe successfully.');
    } catch (error) {
        console.error('Failed to log into MeetMe:', error);
        throw error;
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
    // Replace with actual logic to extract chat data
    const chatData = await page.evaluate(() => {
        const messages = [];
        document.querySelectorAll('.chat-message').forEach(msg => {
            const userElement = msg.querySelector('.user-name');
            const textElement = msg.querySelector('.message-text');
            const timestampElement = msg.querySelector('.timestamp');
            const messageIdElement = msg.querySelector('.message-id'); // New field
            if (userElement && textElement && timestampElement) {
                messages.push({
                    user: userElement.innerText,
                    text: textElement.innerText,
                    timestamp: timestampElement.innerText,
                    id: messageIdElement ? messageIdElement.innerText : null // New field
                });
            }
        });
        return messages;
    });
    return chatData;
}

/**
 * Logs out from the MeetMe service.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function logoutFromMeetMe(page) {
    try {
        console.log('Logging out from MeetMe...');
        await page.click('#logoutButton'); // Replace with actual selector
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Logged out from MeetMe successfully.');
    } catch (error) {
        console.error('Failed to log out from MeetMe:', error);
        throw error;
    }
}

module.exports = {
    initializeBrowser,
    loginToMeetMe,
    navigateToChatPage,
    handlePopUps,
    extractChatData,
    logoutFromMeetMe
};
```