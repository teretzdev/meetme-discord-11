require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const eventEmitter = require('../events/eventEmitter');

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for incoming messages
client.on('messageCreate', message => {
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

/**
 * Sends a message to a specified Discord channel.
 * @param {string} channelId - The ID of the channel to send the message to.
 * @param {string} content - The content of the message to send.
 */
async function sendMessage(channelId, content) {
    try {
        const channel = await client.channels.fetch(channelId);
        if (channel) {
            await channel.send(content);
            console.log(`Message sent to channel ${channelId}: ${content}`);
        } else {
            console.error(`Channel with ID ${channelId} not found.`);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

/**
 * Listens for 'messageProcessed' events and sends messages to Discord.
 */
eventEmitter.on('messageProcessed', async (processedMessages) => {
    const discordChannelId = process.env.DISCORD_CHANNEL_ID;
    for (const message of processedMessages) {
        try {
            await sendMessage(discordChannelId, `${message.user}: ${message.text} (at ${message.timestamp})`);
            console.log(`Processed message sent to Discord: ${message.user}: ${message.text} (at ${message.timestamp})`);
            eventEmitter.emit('messageSent', message);
        } catch (error) {
            console.error('Error sending processed message to Discord:', error);
        }
    }
});

// Log in to Discord with the bot token
client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = {
    sendMessage
};