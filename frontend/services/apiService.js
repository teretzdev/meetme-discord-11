import axios from 'axios';

/**
 * ApiService class to handle API calls from the frontend to the backend.
 */
class ApiService {
    constructor() {
        this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:2090';
    }

    /**
     * Fetches messages from the backend.
     * @returns {Promise<Array>} The fetched messages.
     */
    async fetchMessages() {
        try {
            const response = await axios.get(`${this.baseUrl}/fetch`);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    /**
     * Processes messages by sending them to the backend.
     * @param {Array} messages - The messages to process.
     * @returns {Promise<Array>} The processed messages.
     */
    async processMessages(messages) {
        try {
            const response = await axios.post(`${this.baseUrl}/process`, { messages });
            return response.data.processedMessages;
        } catch (error) {
            console.error('Error processing messages:', error);
            throw error;
        }
    }

    /**
     * Updates the chat history by sending data to the backend.
     * @param {Array} historyData - The history data to update.
     * @returns {Promise<void>}
     */
    async updateHistory(historyData) {
        try {
            await axios.post(`${this.baseUrl}/update-history`, { historyData });
        } catch (error) {
            console.error('Error updating history:', error);
            throw error;
        }
    }
}

// Export an instance of the ApiService class
const apiService = new ApiService();
export default apiService;
