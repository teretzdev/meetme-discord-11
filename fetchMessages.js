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
        logger.info('Starting setup process...');
        await setup();
        logger.info('Setup process completed successfully.');
    } catch (error) {
        logger.error('Error during setup:', error.message);
        return;
    }

    let browser;
    let page;
    try {
        logger.info('Initializing browser...');
        browser = await initializeBrowser();
        logger.info('Browser initialized successfully.');
        page = await browser.newPage();
        logger.info('New page created in browser.');
    } catch (error) {
        logger.error('Error initializing browser:', error.message);
        if (browser) await browser.close();
        return;
    }

    try {
        logger.info('Logging into MeetMe...');
        await loginToMeetMe(page);
        logger.info('Logged into MeetMe successfully.');
    } catch (error) {
        logger.error('Error logging into MeetMe:', error.message);
        logger.info('Closing browser...');
        await browser.close();
        logger.info('Browser closed successfully.');
        return;
    }

    try {
        logger.info('Navigating to chat page...');
        await navigateToChatPage(page);
        logger.info('Navigated to chat page successfully.');
    } catch (error) {
        logger.error('Error navigating to chat page:', error.message);
        await browser.close();
        return;
    }

    try {
        logger.info('Handling pop-ups...');
        await handlePopUps(page);
        logger.info('Pop-ups handled successfully.');
    } catch (error) {
        logger.error('Error handling pop-ups:', error.message);
    }

    let chatData;
    try {
        logger.info('Extracting chat data...');
        chatData = await extractChatData(page);
        logger.info(`Extracted ${chatData.length} messages from chat.`);
    } catch (error) {
        logger.error('Error extracting chat data:', error.message);
        await browser.close();
        return;
    }

    try {
        logger.info('Updating chat history in Google Sheets...');
        await updateChatHistory(chatData);
        logger.info('Chat history updated successfully in Google Sheets.');

        logger.info('Processing messages using AI Agent...');
        const processedMessages = await Promise.all(chatData.map(async (message) => {
            const aiResponse = await aiAgent.sendMessage(message.text);
            return {
                user: message.user,
                text: aiResponse.responseText,
                sentiment: aiResponse.sentiment,
                timestamp: message.timestamp,
            };
        }));
        logger.info('Messages processed successfully using AI Agent.');

        logger.info('Emitting messageProcessed event...');
        logger.logEventEmitted('messageProcessed');
        eventEmitter.emit('messageProcessed', processedMessages);
        logger.info('messageProcessed event emitted successfully.');
    } catch (error) {
        logger.error('Error during Google Sheets update or AI processing:', error.message);
    }

    try {
        logger.info('Closing browser...');
        await browser.close();
        logger.info('Browser closed successfully.');
    } catch (error) {
        logger.error('Error closing browser:', error.message);
    }

    logger.info('FetchMessages process completed. Messages fetched and updated successfully.');
}


/**
 * Explicitly export the fetchMessages function for external usage.
 */
export { fetchMessages };