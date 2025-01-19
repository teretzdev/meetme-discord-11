// fetchMessages.js

// Import necessary modules and dependencies
const puppeteer = require('puppeteer');
const { Logger } = require('./src/utils/logger');
const { setup } = require('./src/utils/setup.cjs');
const { getChatHistory, updateChatHistory } = require('./src/services/sheetService');
const { initializeBrowser, loginToMeetMe, navigateToChatPage, handlePopUps, extractChatData } = require('./src/services/meetmeService');
const { sendMessage } = require('./src/services/discordIntegration');
const { sendMessage } = require('./src/services/discordIntegration');

// Initialize logger
const logger = new Logger();

// Main function to fetch messages
async function fetchMessages() {
    try {
        // Setup environment and connections
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
            const content = `${message.user}: ${message.text} (at ${message.timestamp})`;
            await sendMessage(discordChannelId, content);
        }

        // Send each new chat message to the specified Discord channel
        const discordChannelId = process.env.DISCORD_CHANNEL_ID;
        for (const message of chatData) {
            const content = `${message.user}: ${message.text} (at ${message.timestamp})`;
            await sendMessage(discordChannelId, content);
        }

        // Close the browser
        await browser.close();

        logger.info('Messages fetched and updated successfully.');
    } catch (error) {
        logger.error('Error fetching messages:', error);
    }
}

// Execute the fetchMessages function
fetchMessages();