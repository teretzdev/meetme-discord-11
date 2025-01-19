// fetchMessages.js

// Import necessary modules and dependencies
import puppeteer from 'puppeteer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import amqplib from 'amqplib';

// Load environment variables from .env file
dotenv.config();

// Function to fetch messages using Puppeteer
async function fetchMessages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the desired URL
  await page.goto('https://example.com/login');

  // Perform login and navigate to messages page
  await page.type('#username', process.env.USERNAME);
  await page.type('#password', process.env.PASSWORD);
  await page.click('#login-button');
  await page.waitForNavigation();

  // Extract messages
  const messages = await page.evaluate(() => {
    const elements = document.querySelectorAll('.message');
    return Array.from(elements).map(element => element.textContent);
  });

  await browser.close();
  return messages;
}

// Function to send messages to a message queue
async function sendMessageQueue(messages) {
  const connection = await amqplib.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();
  const queue = 'messages';

  await channel.assertQueue(queue, { durable: false });
  messages.forEach(message => {
    channel.sendToQueue(queue, Buffer.from(message));
  });

  setTimeout(() => {
    connection.close();
  }, 500);
}

// Main function to execute the fetch and send operations
async function main() {
  try {
    const messages = await fetchMessages();
    await sendMessageQueue(messages);
    console.log('Messages fetched and sent to queue successfully.');
  } catch (error) {
    console.error('Error fetching or sending messages:', error);
  }
}

// Execute the main function
main();
