// src/services/meetmeService.js

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Base URL for the MeetMe API
const BASE_URL = process.env.MEETME_API_URL;

// Function to fetch user data from the MeetMe API
async function fetchUserData(userId) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MEETME_API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Function to fetch messages from the MeetMe API
async function fetchMessages() {
  try {
    const response = await axios.get(`${BASE_URL}/messages`, {
      headers: {
        'Authorization': `Bearer ${process.env.MEETME_API_TOKEN}`
      }
    });
    return response.data.messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

// Export the functions for use in other modules
export { fetchUserData, fetchMessages };
