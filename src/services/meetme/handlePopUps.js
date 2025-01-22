// src/services/meetme/handlePopUps.js

const puppeteer = require('puppeteer');

/**
 * Handles pop-ups that may appear on the page.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function handlePopUps(page) {
    // Example: Close any pop-up if it appears
    const popUpSelector = '.popup-close-button';
    if (await page.$(popUpSelector)) {
        await page.click(popUpSelector);
    }
}

module.exports = {
    handlePopUps
};
