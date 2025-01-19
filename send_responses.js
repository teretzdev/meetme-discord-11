// send_responses.js

const axios = require('axios');

// Function to send responses to the MeetMe API
async function sendResponses(processedMessages) {
  try {
    // Iterate over each processed message and send it to the API
    for (const message of processedMessages) {
      const responsePayload = {
        id: message.id,
        responseText: message.responseText
      };

      // Send POST request to the MeetMe API
      const response = await axios.post('https://api.meetme.com/sendResponse', responsePayload);

      if (response.status !== 200) {
        throw new Error(`Failed to send response for message ID ${message.id}: ${response.statusText}`);
      }

      console.log(`Response sent successfully for message ID ${message.id}`);
    }
  } catch (error) {
    console.error('Error sending responses:', error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}

module.exports = sendResponses;
