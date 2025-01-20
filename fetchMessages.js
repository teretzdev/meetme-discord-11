// fetchMessages.js

// Import necessary modules and dependencies
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

        // Extract chat data
        const chatData = await extractChatData(page);

        // Get existing chat history from Google Sheets
        const chatHistory = await getChatHistory();

        // Update chat history with new data
        await updateChatHistory(chatData, chatHistory);

        // Send each new chat message to the specified Discord channel
        const discordChannelId = process.env.DISCORD_CHANNEL_ID;
        for (const message of chatData) {
            try {
                const processedMessage = await processMessage(message);
                const content = `${processedMessage.user}: ${processedMessage.text} (at ${processedMessage.timestamp})`;
                await sendMessage(discordChannelId, content);
            } catch (error) {
                logger.error('Error processing message:', error.message);
            }
        }

        // Close the browser
        await browser.close();

        logger.info('Messages fetched and updated successfully.');
    } catch (error) {
        logger.error('Error fetching messages:', error.message);
    }
}

/**
 * Processes an individual message.
 * @param {Object} message - The message object to process.
 * @returns {Promise<Object>} The processed message object.
 */
async function processMessage(message) {
    // Example processing logic: append AI response to the message text
    try {
        const aiResponse = await aiAgent.sendMessage(message.text);
        return {
            user: message.user,
            text: aiResponse.processedText,
            timestamp: message.timestamp
        };
    } catch (error) {
        logger.error('Error processing AI message:', error.message);
        throw error;
    }
}

/**
 * Execute the fetchMessages function to start the process.
 */
fetchMessages();