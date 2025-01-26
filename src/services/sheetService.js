// src/services/sheetService.js

const { google } = require('googleapis');
const eventEmitter = require('../events/eventEmitter');
const fs = require('fs');
const path = require('path');

// Load client secrets from a local file or environment variables
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../token.json');

/**
 * Authorizes the client with credentials, then calls the callback function.
 * @returns {Promise<OAuth2Client>} The authenticated Google OAuth2 client.
 */
async function authorize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    if (fs.existsSync(TOKEN_PATH)) {
        const token = fs.readFileSync(TOKEN_PATH, 'utf8');
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    } else {
        throw new Error('Token not found. Please authenticate the application.');
    }
}

/**
 * Retrieves chat history from the Google Sheet.
 * @param {OAuth2Client} auth - The authenticated Google OAuth2 client.
 * @returns {Promise<Array>} The chat history data.
 */
async function getChatHistory(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'ChatHistory!A1:E'; // Adjust the range as needed

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        logger.info('Chat history retrieved successfully.');
        return response.data.values || [];
    } catch (error) {
        logger.error('Error retrieving chat history:', error.message);
        throw error;
    }
}

/**
 * Updates chat history in the Google Sheet.
 * @param {OAuth2Client} auth - The authenticated Google OAuth2 client.
 * @param {Array} chatData - The new chat data to append.
 * @returns {Promise<void>}
 */
async function updateChatHistory(auth, chatData) {
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'ChatHistory!A1:E'; // Adjust the range as needed

    const maxRetries = 5;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: {
                    values: chatData,
                },
            });
            logger.info('Chat history updated successfully.');
            break;
        } catch (error) {
            if (error.code === 429) { // Rate limit error
                attempt++;
                const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
                logger.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                logger.error('Error updating chat history:', error.message);
                throw error;
            }
        }
    }
}

/**
 * Listens for 'messageProcessed' events and updates chat history in Google Sheets.
 */
eventEmitter.on('messageProcessed', async (messages) => {
    try {
        const auth = await authorize();
        for (const message of messages) {
            const chatData = [[message.user, message.text, message.timestamp]];
            logger.info('Appending chat data to Google Sheets:', chatData);
            await updateChatHistory(auth, chatData);
            logger.info('Chat history updated successfully for message:', message);
        }
    } catch (error) {
        logger.error('Error updating chat history:', error.message);
    }
});

module.exports = {
    authorize,
    getChatHistory,
    updateChatHistory,
};