// tests/aiAgent.test.js

const axios = require('axios');
const AIAgent = require('../src/agents/aiAgent');

jest.mock('axios');

describe('AIAgent sendMessage', () => {
    let aiAgent;

    beforeEach(() => {
        aiAgent = new AIAgent();
    });

    it('should send a message and receive a successful response', async () => {
        const mockResponse = { data: { reply: 'Hello!' } };
        axios.post.mockResolvedValue(mockResponse);

        const response = await aiAgent.sendMessage('Hi there!');
        expect(response).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith(aiAgent.apiUrl, {
            apiKey: aiAgent.apiKey,
            message: 'Hi there!'
        });
    });

    it('should handle network errors gracefully', async () => {
        const networkError = new Error('Network Error');
        axios.post.mockRejectedValue(networkError);

        await expect(aiAgent.sendMessage('Hi there!')).rejects.toThrow('Network Error');
        expect(axios.post).toHaveBeenCalledWith(aiAgent.apiUrl, {
            apiKey: aiAgent.apiKey,
            message: 'Hi there!'
        });
    });

    it('should handle HTTP errors (4xx and 5xx) appropriately', async () => {
        const httpError = {
            response: {
                status: 500,
                data: { error: 'Internal Server Error' }
            }
        };
        axios.post.mockRejectedValue(httpError);

        await expect(aiAgent.sendMessage('Hi there!')).rejects.toThrow('Error sending message to AI service:');
        expect(axios.post).toHaveBeenCalledWith(aiAgent.apiUrl, {
            apiKey: aiAgent.apiKey,
            message: 'Hi there!'
        });
    });

    it('should throw an error if the AI service returns an error response', async () => {
        const errorResponse = {
            response: {
                status: 400,
                data: { error: 'Bad Request' }
            }
        };
        axios.post.mockRejectedValue(errorResponse);

        await expect(aiAgent.sendMessage('Hi there!')).rejects.toThrow('Error sending message to AI service:');
        expect(axios.post).toHaveBeenCalledWith(aiAgent.apiUrl, {
            apiKey: aiAgent.apiKey,
            message: 'Hi there!'
        });
    });
});
