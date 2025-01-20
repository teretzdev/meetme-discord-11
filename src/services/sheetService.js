// src/services/sheetService.js

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { Logger } = require('../utils/logger');

// Load client secrets from a local file or environment variables
const CREDENTIALS_PATH = path.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../token.json');

/**
 * Authorizes the client with credentials, then calls the callback function.
 * @returns {Promise<OAuth2Client>} The authenticated Google OAuth2 client.
 */
async function authorize() {
    const logger = new Logger();
    try {
        const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        if (fs.existsSync(TOKEN_PATH)) {
            const token = fs.readFileSync(TOKEN_PATH, 'utf8');
            oAuth2Client.setCredentials(JSON.parse(token));
        } else {
            throw new Error('Token not found. Please authenticate the application.');
        }

        oAuth2Client.on('tokens', (tokens) => {
            if (tokens.refresh_token) {
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
                logger.info('Token refreshed and saved.');
            }
        });

        return oAuth2Client;
    } catch (error) {
        logger.error('Authorization failed:', error);
        throw error;
    }
}

/**
 * Retrieves chat history from the Google Sheet.
 * @param {OAuth2Client} auth - The authenticated Google OAuth2 client.
 * @returns {Promise<Array>} The chat history data.
 */
async function getChatHistory(auth) {
    const logger = new Logger();
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = 'ChatHistory!A1:E'; // Adjust the range as needed

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        logger.info('Chat history retrieved successfully.');
        return response.data.values || [];
    } catch (error) {
        logger.error('Failed to retrieve chat history:', error);
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
    const logger = new Logger();
    try {
        const logger = new Logger();
        try {
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

            logger.info('Chat history updated successfully.');
        } catch (error) {
            logger.error('Failed to update chat history:', error);
            throw error;
        }

        logger.info('Chat history updated successfully.');
    } catch (error) {
        logger.error('Failed to update chat history:', error);
        throw error;
    }
}

module.exports = {
    authorize,
    getChatHistory,
    updateChatHistory,
};