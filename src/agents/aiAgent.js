    /**
     * Fetches responses from the AI service.
     * @param {string} endpoint - The API endpoint to fetch responses from.
     * @returns {Promise<Object>} The responses from the AI service.
     */
    async fetchResponses(endpoint) {
        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${process.env.AI_API_KEY}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching responses from AI service:', error);
            throw error;
        }
    }