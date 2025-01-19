// src/services/sheetService.js

import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Setup Google Sheets API client
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Function to read data from a Google Sheet
async function readSheet(spreadsheetId, range) {
  const client = await auth.getClient();
  const request = {
    spreadsheetId,
    range,
    auth: client,
  };

  try {
    const response = await sheets.spreadsheets.values.get(request);
    return response.data.values;
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    throw error;
  }
}

// Function to write data to a Google Sheet
async function writeSheet(spreadsheetId, range, values) {
  const client = await auth.getClient();
  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: {
      values,
    },
    auth: client,
  };

  try {
    const response = await sheets.spreadsheets.values.update(request);
    return response.data;
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    throw error;
  }
}

// Export the functions for use in other modules
export { readSheet, writeSheet };
