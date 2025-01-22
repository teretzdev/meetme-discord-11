// fetchMessages.js

// Import necessary modules and dependencies
const eventEmitter = require('./src/events/eventEmitter');
const { Logger } = require('./src/utils/logger');
const { setup } = require('./src/utils/setup.cjs');
const { getChatHistory, updateChatHistory } = require('./src/services/sheetService');
const { initializeBrowser, loginToMeetMe, navigateToChatPage, handlePopUps, extractChatData } = require('./src/services/meetmeService');
const { sendMessage } = require('./src/services/discordIntegration');
const AIAgent = require('./src/agents/aiAgent');

// Initialize logger
const logger = new Logger();

const aiAgent = new AIAgent();

async function fetchMessages() {
    try {
        await setup();

        // Initialize Puppeteer browser
        const browser = await initializeBrowser();
        const page = await browser.newPage();

        // Login to MeetMe
        await loginToMeetMe(page);

        // Navigate to chat page
        await navigateToChatPage(page);

        // Handle any pop-ups
        await handlePopUps(page);

        // Emit 'fetchMessages' event to start the process
        logger.logEventEmitted('fetchMessages');
        eventEmitter.emit('fetchMessages', page);

        // Close the browser
        await browser.close();

        logger.info('Messages fetched and updated successfully.');
    } catch (error) {
        logger.error('Error fetching messages:', error.message);
    }
}


/**
 * Execute the fetchMessages function to start the process.
 */
fetchMessages();