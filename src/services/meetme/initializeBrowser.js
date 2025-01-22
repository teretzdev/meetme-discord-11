// src/services/meetme/initializeBrowser.js

const puppeteer = require('puppeteer');

/**
 * Initializes a Puppeteer browser instance.
 * @returns {Promise<Browser>} The Puppeteer browser instance.
 */
async function initializeBrowser() {
    const browser = await puppeteer.launch({ headless: true });
    return browser;
}

module.exports = {
    initializeBrowser
};
