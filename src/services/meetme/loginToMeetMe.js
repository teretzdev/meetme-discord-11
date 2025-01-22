// src/services/meetme/loginToMeetMe.js

const puppeteer = require('puppeteer');

/**
 * Logs into the MeetMe service.
 * @param {Page} page - The Puppeteer page instance.
 * @returns {Promise<void>}
 */
async function loginToMeetMe(page) {
    const loginUrl = 'https://www.meetme.com/login';
    const maxRetries = 3;
    let attempt = 0;
    let loggedIn = false;

    while (attempt < maxRetries && !loggedIn) {
        try {
            await page.goto(loginUrl, { waitUntil: 'networkidle2' });

            // Replace with actual selectors and credentials
            await page.type('#username', process.env.MEETME_USERNAME);
            await page.type('#password', process.env.MEETME_PASSWORD);
            await page.click('#loginButton');

            await page.waitForNavigation({ waitUntil: 'networkidle2' });

            // Check if login was successful
            if (await page.$('.login-error') === null) {
                loggedIn = true;
                console.log('Login successful');
            } else {
                throw new Error('Login failed: Incorrect credentials');
            }
        } catch (error) {
            console.error(`Login attempt ${attempt + 1} failed:`, error.message);
            attempt++;
            if (attempt >= maxRetries) {
                throw new Error('Max login attempts reached. Please check your credentials and network connection.');
            }
        }
    }
}

module.exports = {
    loginToMeetMe
};