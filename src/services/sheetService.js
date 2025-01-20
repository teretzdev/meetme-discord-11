```javascript
const { google } = require('googleapis');
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
        oAuth2Client.on('tokens', (tokens) => {
            if (tokens.refresh_token) {
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
                console.log('Token refreshed and saved.');
            }
        });
        return oAuth2Client;
    } else {
        throw new Error('Token not found. Please authenticate the application.');
    }
}

/**
 * Retrieves chat history from the Google Sheet.
 * @returns {Promise<Array>} The chat history data.
 */
async function getChatHistory() {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'ChatHistory!A1:E'; // Adjust the range as needed

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        console.log('Chat history retrieved successfully.');
        return response.data.values || [];
    } catch (error) {
        console.error('Error retrieving chat history:', error.message);
        throw error;
    }
}

/**
 * Updates chat history in the Google Sheet.
 * @param {Array} chatData - The new chat data to append.
 * @returns {Promise<void>}
 */
async function updateChatHistory(chatData) {
    const auth = await authorize();
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
        console.log('Chat history updated successfully.');
    } catch (error) {
        console.error('Error updating chat history:', error.message);
        throw error;
    }
}

module.exports = {
    authorize,
    getChatHistory,
    updateChatHistory,
};

/**
 * Clears chat history in the Google Sheet.
 * @returns {Promise<void>}
 */
async function clearChatHistory() {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'ChatHistory!A1:E'; // Adjust the range as needed

    try {
        await sheets.spreadsheets.values.clear({
            spreadsheetId,
            range,
        });
        console.log('Chat history cleared successfully.');
    } catch (error) {
        console.error('Error clearing chat history:', error.message);
        throw error;
    }
}

module.exports = {
    authorize,
    getChatHistory,
    updateChatHistory,
    clearChatHistory,
};
```