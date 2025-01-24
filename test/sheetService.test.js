// test/sheetService.test.js

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { authorize, getChatHistory, updateChatHistory } = require('../src/services/sheetService');

jest.mock('fs');
jest.mock('googleapis', () => ({
    google: {
        auth: {
            OAuth2: jest.fn().mockImplementation(() => ({
                setCredentials: jest.fn(),
            })),
        },
        sheets: jest.fn().mockReturnValue({
            spreadsheets: {
                values: {
                    get: jest.fn(),
                    append: jest.fn(),
                },
            },
        }),
    },
}));

describe('sheetService', () => {
    const mockAuthClient = new google.auth.OAuth2();
    const mockSheets = google.sheets();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('authorize', () => {
        it('should authorize the client with credentials and token', async () => {
            const credentials = {
                installed: {
                    client_id: 'test_client_id',
                    client_secret: 'test_client_secret',
                    redirect_uris: ['http://localhost'],
                },
            };
            const token = { access_token: 'test_access_token' };

            fs.readFileSync.mockImplementation((filePath) => {
                if (filePath.includes('credentials.json')) {
                    return JSON.stringify(credentials);
                }
                if (filePath.includes('token.json')) {
                    return JSON.stringify(token);
                }
            });

            const authClient = await authorize();

            expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('credentials.json'), 'utf8');
            expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining('token.json'), 'utf8');
            expect(authClient.setCredentials).toHaveBeenCalledWith(token);
        });

        it('should throw an error if token is not found', async () => {
            fs.readFileSync.mockImplementation((filePath) => {
                if (filePath.includes('credentials.json')) {
                    return JSON.stringify({});
                }
                throw new Error('Token not found');
            });

            await expect(authorize()).rejects.toThrow('Token not found. Please authenticate the application.');
        });
    });

    describe('getChatHistory', () => {
        it('should retrieve chat history from Google Sheets', async () => {
            const mockData = [['User1', 'Hello', '10:00 AM']];
            mockSheets.spreadsheets.values.get.mockResolvedValue({ data: { values: mockData } });

            const chatHistory = await getChatHistory(mockAuthClient);

            expect(mockSheets.spreadsheets.values.get).toHaveBeenCalledWith({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'ChatHistory!A1:E',
            });
            expect(chatHistory).toEqual(mockData);
        });
    });

    describe('updateChatHistory', () => {
        it('should update chat history in Google Sheets', async () => {
            const chatData = [['User1', 'Hello', '10:00 AM']];
            mockSheets.spreadsheets.values.append.mockResolvedValue({});

            await updateChatHistory(mockAuthClient, chatData);

            expect(mockSheets.spreadsheets.values.append).toHaveBeenCalledWith({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'ChatHistory!A1:E',
                valueInputOption: 'RAW',
                resource: { values: chatData },
            });
        });
    });
});
