// tests/sheetService.test.js

const { google } = require('googleapis');
const { updateChatHistory } = require('../src/services/sheetService');

jest.mock('googleapis', () => {
    const sheets = {
        spreadsheets: {
            values: {
                append: jest.fn()
            }
        }
    };
    return { google: { sheets: jest.fn(() => sheets) } };
});

describe('updateChatHistory', () => {
    let auth;
    let chatData;

    beforeEach(() => {
        auth = {}; // Mock auth object
        chatData = [
            ['User1', 'Hello!', '2023-10-01 10:00:00'],
            ['User2', 'Hi there!', '2023-10-01 10:01:00']
        ];
    });

    it('should append chat data to the Google Sheet successfully', async () => {
        const sheets = google.sheets();
        sheets.spreadsheets.values.append.mockResolvedValue({ status: 200 });

        await expect(updateChatHistory(auth, chatData)).resolves.not.toThrow();
        expect(sheets.spreadsheets.values.append).toHaveBeenCalledWith({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'ChatHistory!A1:E',
            valueInputOption: 'RAW',
            resource: {
                values: chatData
            }
        });
    });

    it('should handle errors during the append operation', async () => {
        const sheets = google.sheets();
        const error = new Error('API Error');
        sheets.spreadsheets.values.append.mockRejectedValue(error);

        await expect(updateChatHistory(auth, chatData)).rejects.toThrow('API Error');
    });

    it('should not attempt to append if chat data is empty', async () => {
        const sheets = google.sheets();
        chatData = [];

        await expect(updateChatHistory(auth, chatData)).resolves.not.toThrow();
        expect(sheets.spreadsheets.values.append).not.toHaveBeenCalled();
    });
});
