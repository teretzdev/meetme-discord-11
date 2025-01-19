// src/config/config.js

// Load environment variables from .env file
require('dotenv').config();

// Configuration object
const config = {
    puppeteer: {
        headless: process.env.PUPPETEER_HEADLESS === 'true',
        args: process.env.PUPPETEER_ARGS ? process.env.PUPPETEER_ARGS.split(',') : []
    },
    rabbitmq: {
        url: process.env.RABBITMQ_URL,
        queue: process.env.RABBITMQ_QUEUE
    },
    google: {
        sheetId: process.env.GOOGLE_SHEET_ID,
        credentialsPath: process.env.GOOGLE_CREDENTIALS_PATH,
        tokenPath: process.env.GOOGLE_TOKEN_PATH
    },
    meetme: {
        username: process.env.MEETME_USERNAME,
        password: process.env.MEETME_PASSWORD
    },
    ai: {
        apiKey: process.env.AI_API_KEY,
        apiUrl: process.env.AI_API_URL
    }
};

// Export the configuration object
module.exports = config;
