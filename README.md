# meetme-discord-11

## Overview
This project is a Node.js application designed for the MeetMe Discord application. It serves as a basic setup to ensure the Node.js environment is correctly configured.

## Prerequisites
- Node.js and npm should be installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
- RabbitMQ and MongoDB should be installed and running on your system.
- Ensure you have access to an AI service for message processing.
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
AI_API_KEY=your_ai_api_key # API key for the AI service
AI_API_URL=your_ai_api_url # URL for the AI service endpoint

# Discord Bot Setup
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id
```

## Discord Bot Setup
To set up the Discord bot, follow these steps:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application" and give your application a name.
3. Navigate to the "Bot" tab on the left sidebar and click "Add Bot".
4. Under the "Token" section, click "Copy" to copy your bot token. Add this token to your `.env` file as `DISCORD_BOT_TOKEN`.
5. Invite the bot to your server by generating an OAuth2 URL under the "OAuth2" tab. Make sure to select the "bot" scope and assign necessary permissions.
6. Copy the channel ID where you want the bot to send messages and add it to your `.env` file as `DISCORD_CHANNEL_ID`.

## OAuth Credentials
1. Go to the Google Cloud Console.
2. Create a new project and enable the Google Sheets API.
3. Create OAuth 2.0 credentials and download the `credentials.json` file.
4. Place the `credentials.json` file in the root directory of your project.

## AI Service Setup
To integrate the AI service for processing messages, ensure you have the following:

1. An account with the AI service provider.
2. Your API key and endpoint URL, which should be added to the `.env` file as `AI_API_KEY` and `AI_API_URL`.

## Running the Application
To start the application, use the following command:

```bash
npm start
```

This command will execute the `fetchMessages.js` file, which integrates with MeetMe, Google Sheets, and an AI service to fetch and update chat messages.