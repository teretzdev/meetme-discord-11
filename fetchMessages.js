// fetchMessages.js

// Import necessary modules and dependencies
const eventEmitter = require('./src/events/eventEmitter');
const { Logger } = require('./src/utils/logger');
const { setup } = require('./src/utils/setup.cjs');
const { getChatHistory, updateChatHistory } = require('./src/services/sheetService');
const { initializeBrowser } = require('./src/services/meetme/initializeBrowser');
const { loginToMeetMe } = require('./src/services/meetme/loginToMeetMe');
const { navigateToChatPage } = require('./src/services/meetme/navigateToChatPage');
const { handlePopUps } = require('./src/services/meetme/handlePopUps');
const { extractChatData } = require('./src/services/meetme/extractChatData');
const AIAgent = require('./src/agents/aiAgent');

// Initialize logger
const logger = new Logger();

const aiAgent = new AIAgent();

async function fetchMessages() {
    logger.info('Starting setup process.');
    try {
        await setup();
        logger.info('Setup process completed successfully.');
    } catch (error) {
        logger.error('Error during setup:', error.message);
        return;
    }

    try {
        // Initialize Puppeteer browser
        logger.info('Initializing browser.');
        const browser = await initializeBrowser();
        logger.info('Browser initialized successfully.');
        const page = await browser.newPage();
        logger.info('New page created in browser.');

        // Login to MeetMe
        logger.info('Attempting to log into MeetMe.');
        try {
            await loginToMeetMe(page);
            logger.info('Logged into MeetMe successfully.');
        } catch (error) {
            logger.error('Error logging into MeetMe:', error.message);
            await browser.close();
            return;
        }

        // Navigate to chat page
        logger.info('Navigating to chat page.');
        try {
            await navigateToChatPage(page);
            logger.info('Navigation to chat page successful.');
        } catch (error) {
            logger.error('Error navigating to chat page:', error.message);
            await browser.close();
            return;
        }

        // Handle any pop-ups
        logger.info('Handling pop-ups.');
        try {
            await handlePopUps(page);
            logger.info('Pop-ups handled successfully.');
        } catch (error) {
            logger.error('Error handling pop-ups:', error.message);
        }

        // Extract chat data
        logger.info('Extracting chat data.');
        try {
            chatData = await extractChatData(page);
            logger.info('Chat data extracted successfully.');
        } catch (error) {
            logger.error('Error extracting chat data:', error.message);
            await browser.close();
            return;
        }

        // Emit 'messageFetched' event with the extracted chat data
        logger.logEventEmitted('messageFetched');
        eventEmitter.emit('messageFetched', chatData);

        // Close the browser
        try {
            await browser.close();
            logger.info('Browser closed successfully.');
        } catch (error) {
            logger.error('Error closing browser:', error.message);
        }

        logger.info('Messages fetched and updated successfully.');
    } catch (error) {
        logger.error('Error fetching messages:', error.message);
    }
}


/**
 * Execute the fetchMessages function to start the process.
 */
fetchMessages();