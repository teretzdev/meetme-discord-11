// test/aiAgent.test.js

const axios = require('axios');
const AIAgent = require('../src/agents/aiAgent');
const eventEmitter = require('../src/events/eventEmitter');

jest.mock('axios');
jest.mock('../src/events/eventEmitter');

describe('AIAgent', () => {
    let aiAgent;

    beforeEach(() => {
        process.env.AI_API_KEY = 'test_api_key';
        process.env.AI_API_URL = 'http://test.api.url';
        aiAgent = new AIAgent();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with API key and URL', () => {
        expect(aiAgent.apiKey).toBe('test_api_key');
        expect(aiAgent.apiUrl).toBe('http://test.api.url');
    });

    it('should throw an error if API configuration is missing', () => {
        delete process.env.AI_API_KEY;
        delete process.env.AI_API_URL;
        expect(() => new AIAgent()).toThrow('AI API configuration is missing. Please check your environment variables.');
    });

    it('should send a message to the AI service and return a response', async () => {
        const message = 'Hello AI';
        const aiResponse = { processedText: 'Hello Human' };
        axios.post.mockResolvedValue({ data: aiResponse });

        const response = await aiAgent.sendMessage(message);

        expect(axios.post).toHaveBeenCalledWith('http://test.api.url', {
            apiKey: 'test_api_key',
            message: message
        });
        expect(response).toEqual(aiResponse);
    });

    it('should handle errors when sending a message to the AI service', async () => {
        const message = 'Hello AI';
        const errorMessage = 'Network Error';
        axios.post.mockRejectedValue(new Error(errorMessage));

        await expect(aiAgent.sendMessage(message)).rejects.toThrow(errorMessage);
    });

    it('should process messages and emit messageProcessed event', async () => {
        const chatData = [{ user: 'User1', text: 'Hello', timestamp: '10:00 AM' }];
        const aiResponse = { processedText: 'Hello Human' };
        axios.post.mockResolvedValue({ data: aiResponse });

        eventEmitter.emit.mockImplementation((event, data) => {
            if (event === 'messageFetched') {
                aiAgent.listenForMessages();
            }
        });

        eventEmitter.emit('messageFetched', chatData);

        // Wait for async processing
        await new Promise(setImmediate);

        expect(eventEmitter.emit).toHaveBeenCalledWith('messageProcessed', [{
            user: 'User1',
            text: 'Hello Human',
            timestamp: '10:00 AM'
        }]);
    });
});
