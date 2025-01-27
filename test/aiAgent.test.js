// test/aiAgent.test.js

import axios from 'axios';
import AIAgent from '../src/agents/aiAgent.js';
import eventEmitter from '../src/events/eventEmitter.js';

jest.mock('axios');
jest.mock('../src/events/eventEmitter', () => ({
    emit: jest.fn(),
    on: jest.fn()
}));

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

    describe('constructor', () => {
        it('should throw an error if API key is missing', () => {
            delete process.env.AI_API_KEY;
            expect(() => new AIAgent()).toThrow('AI API configuration is missing. Please check your environment variables.');
        });

        it('should throw an error if API URL is missing', () => {
            delete process.env.AI_API_URL;
            expect(() => new AIAgent()).toThrow('AI API configuration is missing. Please check your environment variables.');
        });
    });

    describe('listenForMessages', () => {
        it('should process messages and emit messageProcessed event', async () => {
            const chatData = [{ user: 'User1', text: 'Hello', timestamp: '2023-10-01T10:00:00Z' }];
            const processedText = 'Processed Hello';
            axios.post.mockResolvedValueOnce({ data: { processedText } });

            eventEmitter.emit.mockImplementationOnce((event, data) => {
                if (event === 'messageFetched') {
                    eventEmitter.emit('messageProcessed', data);
                }
            });

            aiAgent.listenForMessages();
            eventEmitter.emit('messageFetched', chatData);

            await new Promise(process.nextTick); // Wait for async operations

            expect(eventEmitter.emit).toHaveBeenCalledWith('messageProcessed', [{
                user: 'User1',
                text: processedText,
                timestamp: '2023-10-01T10:00:00Z'
            }]);
        });
    });

    describe('sendMessage', () => {
        it('should send a message successfully', async () => {
            const message = 'Hello';
            const processedText = 'Processed Hello';
            axios.post.mockResolvedValueOnce({ data: { processedText } });

            const response = await aiAgent.sendMessage(message);

            expect(axios.post).toHaveBeenCalledWith('http://test.api.url', {
                apiKey: 'test_api_key',
                message: 'Hello'
            });
            expect(response).toEqual({ processedText });
        });

        it('should throw an error if the request fails', async () => {
            const message = 'Hello';
            axios.post.mockRejectedValueOnce(new Error('Request failed'));

            await expect(aiAgent.sendMessage(message)).rejects.toThrow('Request failed');
        });

        it('should retry on transient errors', async () => {
            const message = 'Hello';
            const processedText = 'Processed Hello';
            axios.post
                .mockRejectedValueOnce({ response: { status: 500 } })
                .mockResolvedValueOnce({ data: { processedText } });

            const response = await aiAgent.sendMessage(message);

            expect(axios.post).toHaveBeenCalledTimes(2);
            expect(response).toEqual({ processedText });
        });
    });

    describe('fetchResponses', () => {
        it('should fetch responses successfully', async () => {
            const responses = { data: 'Some responses' };
            axios.get.mockResolvedValueOnce({ data: responses });

            const result = await aiAgent.fetchResponses();

            expect(axios.get).toHaveBeenCalledWith('http://test.api.url', {
                headers: { 'Authorization': 'Bearer test_api_key' }
            });
            expect(result).toEqual(responses);
        });

        it('should throw an error if fetching responses fails', async () => {
            axios.get.mockRejectedValueOnce(new Error('Fetch failed'));

            await expect(aiAgent.fetchResponses()).rejects.toThrow('Fetch failed');
        });
    });
});