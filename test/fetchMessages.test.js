// test/fetchMessages.test.js

const puppeteer = require('puppeteer');
const eventEmitter = require('../src/events/eventEmitter');
const { Logger } = require('../src/utils/logger');
const { setup } = require('../src/utils/setup.cjs');
const { fetchMessages } = require('../fetchMessages');

// Mock dependencies
jest.mock('puppeteer');
jest.mock('../src/events/eventEmitter');
jest.mock('../src/utils/logger');
jest.mock('../src/utils/setup.cjs');

// Setup mock implementations
beforeEach(() => {
    puppeteer.launch.mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            goto: jest.fn(),
            type: jest.fn(),
            click: jest.fn(),
            waitForNavigation: jest.fn(),
            evaluate: jest.fn().mockResolvedValue([]),
            close: jest.fn()
        }),
        close: jest.fn()
    });

    setup.mockResolvedValue();
    Logger.mockImplementation(() => ({
        info: jest.fn(),
        error: jest.fn(),
        logEventEmitted: jest.fn()
    }));
});

describe('fetchMessages', () => {
    it('should execute successfully and emit messageFetched event', async () => {
        await fetchMessages();

        expect(setup).toHaveBeenCalled();
        expect(puppeteer.launch).toHaveBeenCalled();
        expect(eventEmitter.emit).toHaveBeenCalledWith('messageFetched', expect.any(Array));
        expect(Logger.prototype.info).toHaveBeenCalledWith('Messages fetched and updated successfully.');
    });

    it('should initialize the browser and create a new page', async () => {
        await fetchMessages();

        const browser = await puppeteer.launch();
        expect(browser.newPage).toHaveBeenCalled();
    });

    it('should login to MeetMe', async () => {
        const page = await puppeteer.launch().newPage();
        await fetchMessages();

        expect(page.goto).toHaveBeenCalledWith('https://www.meetme.com/login', { waitUntil: 'networkidle2' });
        expect(page.type).toHaveBeenCalledWith('#username', process.env.MEETME_USERNAME);
        expect(page.type).toHaveBeenCalledWith('#password', process.env.MEETME_PASSWORD);
        expect(page.click).toHaveBeenCalledWith('#loginButton');
        expect(page.waitForNavigation).toHaveBeenCalledWith({ waitUntil: 'networkidle2' });
    });

    it('should navigate to the chat page', async () => {
        const page = await puppeteer.launch().newPage();
        await fetchMessages();

        expect(page.goto).toHaveBeenCalledWith('https://www.meetme.com/chat', { waitUntil: 'networkidle2' });
    });

    it('should handle pop-ups', async () => {
        const page = await puppeteer.launch().newPage();
        page.$.mockResolvedValue(true); // Simulate pop-up presence
        await fetchMessages();

        expect(page.click).toHaveBeenCalledWith('.popup-close-button');
    });

    it('should extract chat data', async () => {
        const page = await puppeteer.launch().newPage();
        const chatData = [{ user: 'User1', text: 'Hello', timestamp: '10:00 AM' }];
        page.evaluate.mockResolvedValue(chatData);
        await fetchMessages();

        expect(page.evaluate).toHaveBeenCalled();
        expect(eventEmitter.emit).toHaveBeenCalledWith('messageFetched', chatData);
    });

    it('should handle errors gracefully', async () => {
        const errorMessage = 'Test error';
        setup.mockRejectedValueOnce(new Error(errorMessage));

        await fetchMessages();

        expect(Logger.prototype.error).toHaveBeenCalledWith('Error fetching messages:', errorMessage);
    });
});