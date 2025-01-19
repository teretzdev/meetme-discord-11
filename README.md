# meetme-discord-11

## Overview
This project is a Node.js application designed for the MeetMe Discord application. It serves as a basic setup to ensure the Node.js environment is correctly configured.

## Prerequisites
- Node.js and npm should be installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

## Installation
To install the necessary dependencies, run the following command in the project directory:

```bash
npm install
```

## Environment Variables
Create a `.env` file in the project root and add the following environment variables:

```
USERNAME=your_username
PASSWORD=your_password
AMQP_URL=your_amqp_url
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_google_credentials.json
MEETME_API_URL=your_meetme_api_url
MEETME_API_TOKEN=your_meetme_api_token
AI_API_URL=your_ai_api_url
AI_API_KEY=your_ai_api_key
MONGODB_URI=your_mongodb_uri
```

## OAuth Credentials and API Keys
Ensure you have the necessary OAuth credentials and API keys set up. For Google Sheets API, download your credentials JSON file and set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to its path.

## RabbitMQ Setup
Ensure RabbitMQ is installed and running. Set the `AMQP_URL` environment variable to your RabbitMQ server URL.

## MongoDB Setup
Ensure MongoDB is installed and running. Set the `MONGODB_URI` environment variable to your MongoDB server URI.

## Running the Application
To start the application, use the following command:

```bash
npm start
```

This command will execute the `fetchMessages.js` file, which fetches messages from a specified source and sends them to a message queue.

## Data Fetching Functionality
The application includes a data fetching module located in `fetch/dataFetcher.js`. This module provides a `fetchData` function that can be used to perform HTTP GET requests to fetch data from an API.

### Example Usage
To use the `fetchData` function, ensure you have a valid API endpoint. The function can be called as follows:

```javascript
import { fetchData } from './fetch/dataFetcher.js';

const url = 'https://api.example.com/data'; // Replace with a real API endpoint
fetchData(url)
    .then(data => console.log('Fetched data:', data))
    .catch(error => console.error('Error:', error));
```

This example demonstrates how to fetch data from an API and log the results to the console.