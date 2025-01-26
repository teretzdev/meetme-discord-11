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
    try {
        await setup();
    } catch (error) {
        logger.error('Error during setup:', error.message);
        return;
    }

    let browser;
    let page;
    try {
        browser = await initializeBrowser();
        page = await browser.newPage();
    } catch (error) {
        logger.error('Error initializing browser:', error.message);
        if (browser) await browser.close();
        return;
    }

    try {
        await loginToMeetMe(page);
    } catch (error) {
        logger.error('Error logging into MeetMe:', error.message);
        await browser.close();
        return;
    }

    try {
        await navigateToChatPage(page);
    } catch (error) {
        logger.error('Error navigating to chat page:', error.message);
        await browser.close();
        return;
    }

    try {
        await handlePopUps(page);
    } catch (error) {
        logger.error('Error handling pop-ups:', error.message);
    }

    let chatData;
    try {
        chatData = await extractChatData(page);
    } catch (error) {
        logger.error('Error extracting chat data:', error.message);
        await browser.close();
        return;
    }

    try {
        logger.logEventEmitted('messageFetched');
        eventEmitter.emit('messageFetched', chatData);
    } catch (error) {
        logger.error('Error emitting messageFetched event:', error.message);
    }

    try {
        await browser.close();
    } catch (error) {
        logger.error('Error closing browser:', error.message);
    }

    logger.info('Messages fetched and updated successfully.');
}


/**
 * Execute the fetchMessages function to start the process.
 */
fetchMessages();