// src/agents/aiAgent.js

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// AI Agent class to interact with an AI service
class AIAgent {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = process.env.AI_API_URL;
  }

  // Method to send a message to the AI service and get a response
  async sendMessage(message) {
    try {
      const response = await axios.post(`${this.baseUrl}/sendMessage`, {
        message,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending message to AI service:', error);
      throw error;
    }
  }

  // Method to fetch AI-generated responses
  async fetchResponses() {
    try {
      const response = await axios.get(`${this.baseUrl}/responses`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.data.responses;
    } catch (error) {
      console.error('Error fetching responses from AI service:', error);
      throw error;
    }
  }
}

// Export the AIAgent class for use in other modules
export default AIAgent;
