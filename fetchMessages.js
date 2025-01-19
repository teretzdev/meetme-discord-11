// fetchMessages.js

// Import necessary modules and dependencies
const puppeteer = require('puppeteer');
const { Logger } = require('./src/utils/logger');
const { setup } = require('./src/utils/setup.cjs');
const { getChatHistory, updateChatHistory } = require('./src/services/sheetService');
const { initializeBrowser, loginToMeetMe, navigateToChatPage, handlePopUps, extractChatData } = require('./src/services/meetmeService');
const AIAgent = require('./src/agents/aiAgent');

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

        // Initialize AI Agent
        const aiAgent = new AIAgent();

        // Process each message and generate AI responses
        for (const message of chatData) {
            try {
                const aiResponse = await aiAgent.sendMessage(message.text);
                // Send AI response back to MeetMe user
                await page.type('.message-input', aiResponse);
                await page.click('.send-button');
            } catch (error) {
                logger.error('Error processing message with AI:', error);
            }
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