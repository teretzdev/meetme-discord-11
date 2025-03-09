import axios from 'axios';

/**
 * API service for communicating with the backend server.
 * Handles HTTP requests to fetch messages, process them, and update history.
 */
class ApiService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
    }

    /**
     * Fetches messages from the backend.
     * @returns {Promise<Array>} A promise that resolves to an array of messages.
     */
    async fetchMessages() {
        try {
            const response = await axios.get(`${this.baseUrl}/fetch`);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw new Error('Failed to fetch messages from the backend.');
        }
    }

    /**
     * Sends messages to the backend for processing.
     * @param {Array} messages - An array of messages to process.
     * @returns {Promise<Array>} A promise that resolves to an array of processed messages.
     */
    async processMessages(messages) {
        try {
            const response = await axios.post(`${this.baseUrl}/process`, { messages });
            return response.data.processedMessages;
        } catch (error) {
            console.error('Error processing messages:', error);
            throw new Error('Failed to process messages.');
        }
    }

    /**
     * Updates the chat history on the backend.
     * @param {Array} historyData - An array of chat history data to update.
     * @returns {Promise<void>} A promise that resolves when the update is successful.
     */
    async updateHistory(historyData) {
        try {
            await axios.post(`${this.baseUrl}/updateHistory`, { historyData });
        } catch (error) {
            console.error('Error updating chat history:', error);
            throw new Error('Failed to update chat history.');
        }
    }
}

const apiService = new ApiService();
export default apiService;
