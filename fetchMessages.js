// fetchMessages.js

// Import necessary modules and dependencies
const puppeteer = require('puppeteer');
const { Logger } = require('./src/utils/logger');
const { setup } = require('./src/utils/setup.cjs');
const { getChatHistory, updateChatHistory } = require('./src/services/sheetService');
const { initializeBrowser, loginToMeetMe, navigateToChatPage, handlePopUps, extractChatData } = require('./src/services/meetmeService');

// Initialize logger
const logger = new Logger();

// Main function to fetch messages
async function fetchMessages() {
    try {
        logger.info('Starting the fetchMessages process.');

        // Setup environment and connections
        logger.info('Setting up environment and connections.');
        await setup();

        logger.info('Initializing Puppeteer browser.');
        const browser = await initializeBrowser();
        const page = await browser.newPage();

        logger.info('Logging into MeetMe.');
        await loginToMeetMe(page);

        logger.info('Navigating to chat page.');
        await navigateToChatPage(page);

        logger.info('Handling any pop-ups.');
        await handlePopUps(page);

        logger.info('Extracting chat data.');
        const chatData = await extractChatData(page);
        logger.info(`Extracted ${chatData.length} chat messages.`);

        logger.info('Fetching existing chat history from Google Sheets.');
        const chatHistory = await getChatHistory();

        logger.info('Updating chat history with new data.');
        await updateChatHistory(chatData, chatHistory);

        logger.info('Closing the browser.');
        await browser.close();

        logger.info('Messages fetched and updated successfully.');
        logger.info('fetchMessages process completed.');
    } catch (error) {
        logger.error('Error fetching messages:', error);
    }
}

// Execute the fetchMessages function
fetchMessages();