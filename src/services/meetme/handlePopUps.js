// src/services/meetme/handlePopUps.js

import puppeteer from 'puppeteer';

/**
 * Handles pop-ups that may appear on the page.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function handlePopUps(page) {
    // Example: Close any pop-up if it appears
    const popUpSelector = '.modal-close';
    if (await page.$(popUpSelector)) {
        await page.click(popUpSelector);
    }
}

export { handlePopUps };