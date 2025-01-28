// src/utils/setup.js

import * as dotenv from 'dotenv';

/**
 * Setup function to initialize environment variables and perform any necessary
 * initialization tasks before the application runs.
 */
function setup() {
    // Load environment variables from .env file
    const result = dotenv.config();

    // Check if there was an error loading the .env file
    if (result.error) {
        console.error('Error loading .env file:', result.error);
        throw result.error;
    }

    // Additional initialization tasks can be added here if needed
}

export { setup };