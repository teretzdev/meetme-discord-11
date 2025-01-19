// fetch_messages.js

const axios = require('axios');

// Function to fetch messages from the MeetMe API
async function fetchMessages() {
  try {
    const response = await axios.get('https://api.meetme.com/messages');
    if (response.status === 200) {
      return response.data.messages; // Assuming the API returns messages in this format
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}

module.exports = fetchMessages;
