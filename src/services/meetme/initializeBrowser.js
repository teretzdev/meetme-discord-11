// src/services/meetme/initializeBrowser.js

import puppeteer from 'puppeteer';

/**
 * Initializes a Puppeteer browser instance.
 * @returns {Promise<Browser>} The Puppeteer browser instance.
 */
async function initializeBrowser() {
    const browser = await puppeteer.launch({ headless: true });
    return browser;
}

export { initializeBrowser };