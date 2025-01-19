// fetch/dataFetcher.js

// Import the node-fetch library to make HTTP requests
import fetch from 'node-fetch';

/**
 * Fetches data from the specified API endpoint using HTTP GET request.
 * @param {string} url - The URL of the API endpoint.
 * @returns {Promise<any>} - A promise that resolves to the data fetched from the API.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { fetchData };
