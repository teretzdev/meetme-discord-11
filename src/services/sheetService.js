// src/services/sheetService.js

const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const readline = require('readline');
const path = require('path');
const { Logger } = require('../utils/logger');
const logger = new Logger();
const { Logger } = require('../utils/logger');

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
        return getNewToken(oAuth2Client);
    }
}

/**
 * Get and store new token after prompting for user authorization.
 * @param {OAuth2Client} oAuth2Client The OAuth2 client to get token for.
 * @returns {Promise<OAuth2Client>} The authenticated Google OAuth2 client.
 */
function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, reject) => {
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return reject('Error retrieving access token');
                oAuth2Client.setCredentials(token);
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                console.log('Token stored to', TOKEN_PATH);
                resolve(oAuth2Client);
            });
        });
    });
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
        logger.error('Error retrieving chat history:', error);
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
    } catch (error) {
        logger.error('Error updating chat history:', error);
        throw error;
    }
}

module.exports = {
    authorize,
    getChatHistory,
    updateChatHistory,
};