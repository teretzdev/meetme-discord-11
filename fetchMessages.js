// fetchMessages.js

// Import necessary modules and dependencies
const eventEmitter = require('./src/events/eventEmitter');
const { Logger } = require('./src/utils/logger');
const { setup } = require('./src/utils/setup.cjs');
const { initializeBrowser } = require('./src/services/meetme/initializeBrowser');
const { loginToMeetMe } = require('./src/services/meetme/loginToMeetMe');
const { navigateToChatPage } = require('./src/services/meetme/navigateToChatPage');
const { handlePopUps } = require('./src/services/meetme/handlePopUps');
const { extractChatData } = require('./src/services/meetme/extractChatData');

// Initialize logger
const logger = new Logger();

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

        // Extract chat data
        const chatData = await extractChatData(page);

        // Emit 'messageFetched' event with the extracted chat data
        logger.logEventEmitted('messageFetched');
        eventEmitter.emit('messageFetched', chatData);

        // Close the browser
        await browser.close();

        logger.info('Messages fetched successfully.');
    } catch (error) {
        logger.error('Error fetching messages:', error.message);
    }
}


/**
 * Execute the fetchMessages function to start the process.
 */
fetchMessages();