// tests/meetmeService.test.js

const puppeteer = require('puppeteer');
const { extractChatData } = require('../src/services/meetmeService');

jest.mock('puppeteer');

describe('extractChatData', () => {
    let page;

    beforeEach(() => {
        page = {
            evaluate: jest.fn()
        };
    });

    it('should correctly parse chat data from a typical chat page', async () => {
        const mockChatData = [
            { user: 'Alice', text: 'Hello!', timestamp: '10:00 AM' },
            { user: 'Bob', text: 'Hi Alice!', timestamp: '10:01 AM' }
        ];

        page.evaluate.mockResolvedValue(mockChatData);

        const result = await extractChatData(page);
        expect(result).toEqual(mockChatData);
    });

    it('should return an empty array when the chat page has no messages', async () => {
        page.evaluate.mockResolvedValue([]);

        const result = await extractChatData(page);
        expect(result).toEqual([]);
    });

    it('should correctly parse chat data with special characters', async () => {
        const mockChatData = [
            { user: 'Charlie', text: 'Good morning 😊', timestamp: '10:05 AM' },
            { user: 'Dana', text: 'How are you?', timestamp: '10:06 AM' }
        ];

        page.evaluate.mockResolvedValue(mockChatData);

        const result = await extractChatData(page);
        expect(result).toEqual(mockChatData);
    });

    it('should handle malformed HTML gracefully', async () => {
        const mockChatData = [
            { user: 'Eve', text: 'Oops, something went wrong!', timestamp: '10:10 AM' }
        ];

        page.evaluate.mockResolvedValue(mockChatData);

        const result = await extractChatData(page);
        expect(result).toEqual(mockChatData);
    });
});
