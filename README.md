# meetme-discord-11

## Overview
This project is a Node.js application designed for the MeetMe Discord application. It serves as a basic setup to ensure the Node.js environment is correctly configured.

## Prerequisites
- Node.js and npm should be installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
- RabbitMQ and MongoDB should be installed and running on your system.
- Google Cloud account for OAuth credentials setup.

## Installation
To install the necessary dependencies, run the following command in the project directory:

```bash
npm install
```

## Environment Setup
Create a `.env` file in the root directory of your project and add the following environment variables:

```
PUPPETEER_HEADLESS=true
RABBITMQ_URL=amqp://localhost
RABBITMQ_QUEUE=your_queue_name
MONGODB_URI=mongodb://localhost:27017/your_db_name
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_CREDENTIALS_PATH=path_to_your_credentials.json
GOOGLE_TOKEN_PATH=path_to_your_token.json
MEETME_USERNAME=your_meetme_username
MEETME_PASSWORD=your_meetme_password
AI_API_KEY=your_ai_api_key
AI_API_URL=your_ai_api_url
PUPPETEER_ARGS=your_puppeteer_args_if_any
GOOGLE_OAUTH_TOKEN=your_google_oauth_token
```

## API Keys and Credentials

### AI Service
- **AI_API_KEY**: Obtain this key from your AI service provider. It is used to authenticate requests to the AI service.
- **AI_API_URL**: The endpoint URL for the AI service.

### Google Cloud
- **GOOGLE_CREDENTIALS_PATH**: Path to your Google OAuth credentials JSON file.
- **GOOGLE_TOKEN_PATH**: Path to your Google OAuth token JSON file.
- **GOOGLE_SHEET_ID**: The ID of the Google Sheet you want to access.
- **GOOGLE_OAUTH_TOKEN**: If using environment variables for tokens, set this to your OAuth token.

### Puppeteer
- **PUPPETEER_HEADLESS**: Set to `true` to run Puppeteer in headless mode.
- **PUPPETEER_ARGS**: Additional arguments for Puppeteer, if needed.

## OAuth Credentials
1. Go to the Google Cloud Console.
2. Create a new project and enable the Google Sheets API.
3. Create OAuth 2.0 credentials and download the `credentials.json` file.
4. Place the `credentials.json` file in the root directory of your project.

## Running the Application
To start the application, use the following command:

```bash
npm start
```

This command will execute the `fetchMessages.js` file, which integrates with MeetMe, Google Sheets, and an AI service to fetch and update chat messages.