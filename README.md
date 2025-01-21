# meetme-discord-11

## Overview
This project is a Node.js application designed for the MeetMe Discord application, refactored into an event-driven architecture. It ensures the Node.js environment is correctly configured and integrates various services using events.

## Prerequisites
- Node.js and npm should be installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
- RabbitMQ and MongoDB should be installed and running on your system.
- Ensure you have access to an AI service for message processing.
- Google Cloud account for OAuth credentials setup.
- Discord account and a Discord bot for integration.
- Ensure `dotenv` is used for environment variable management.

## Installation
To install the necessary dependencies, run the following command in the project directory:

```bash
npm install
```

## Environment Setup
Create a `.env` file in the root directory of your project and add the following environment variables. Ensure all variables are correctly set:

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
PUPPETEER_ARGS=--no-sandbox,--disable-setuid-sandbox # Additional Puppeteer arguments

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

## Event-Driven Architecture
The application is structured around an event-driven architecture, where key actions are triggered by events:
- **fetchMessages**: Initiates the process by emitting a 'fetchMessages' event.
- **messageFetched**: Triggered after chat data is extracted, leading to AI processing.
- **messageProcessed**: Emitted after AI processing, prompting message sending to Discord.
- **messageSent**: Indicates successful message delivery, updating chat history in Google Sheets.

## Features
- **MeetMe Chat Data Extraction**: Extracts chat data from MeetMe using Puppeteer and emits events for further processing.
- **Google Sheets Integration**: Updates chat history in Google Sheets using Google Sheets API upon receiving events.
- **AI Message Processing**: Processes messages using an AI service for enhanced interaction, triggered by events.
- **Discord Message Sending**: Sends processed messages to a Discord channel using Discord.js, based on event triggers.
- **Environment Setup**: Utilizes `dotenv` for managing environment variables.

## Running the Application
To start the application, ensure all services (RabbitMQ, MongoDB) are running and use the following command:

```bash
npm start
```

This command will execute the `fetchMessages.js` file, which now operates in an event-driven manner. It integrates with MeetMe, Google Sheets, Discord, and an AI service to fetch and update chat messages through a series of events. Ensure your `.env` file is correctly configured before running the application.