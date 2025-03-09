// fetchMessages.js

// Import necessary modules and dependencies
import eventEmitter from './src/events/eventEmitter.js';
import { Logger } from './src/utils/logger.js';
import { setup } from './src/utils/setup.js';
import { getChatHistory, updateChatHistory } from './src/services/sheetService.js';
import { initializeBrowser } from './src/services/meetme/initializeBrowser.js';
import { loginToMeetMe } from './src/services/meetme/loginToMeetMe.js';
import { navigateToChatPage } from './src/services/meetme/navigateToChatPage.js';
import { handlePopUps } from './src/services/meetme/handlePopUps.js';
import { extractChatData } from './src/services/meetme/extractChatData.js';
import AIAgent from './src/agents/aiAgent.js';

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