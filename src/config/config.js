// src/config/config.js

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configuration object to hold environment variables and settings
const config = {
  puppeteer: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  rabbitmq: {
    url: process.env.AMQP_URL,
  },
  google: {
    applicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
  meetme: {
    apiUrl: process.env.MEETME_API_URL,
    apiToken: process.env.MEETME_API_TOKEN,
  },
  ai: {
    apiUrl: process.env.AI_API_URL,
    apiKey: process.env.AI_API_KEY,
  }
};

// Export the configuration object
export default config;
