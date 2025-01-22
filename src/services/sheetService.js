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

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    return response.data.values || [];
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

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
            values: chatData,
        },
    });
}

/**
 * Listens for 'messageProcessed' events and updates chat history in Google Sheets.
 */
eventEmitter.on('messageProcessed', async (messages) => {
    try {
        const auth = await authorize();
        for (const message of messages) {
            const chatData = [[message.user, message.text, message.timestamp]];
            console.log('Appending chat data to Google Sheets:', chatData);
            await updateChatHistory(auth, chatData);
            console.log('Chat history updated successfully for message:', message);
        }
    } catch (error) {
        console.error('Error updating chat history:', error);
    }
});

module.exports = {
    authorize,
    getChatHistory,
    updateChatHistory,
};