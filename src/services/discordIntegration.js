// src/services/discordIntegration.js

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

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

// Log in to Discord with the bot token
client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = {
    sendMessage
};
