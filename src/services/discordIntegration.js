require('dotenv').config();
const { Client, GatewayIntentBits, Message,
    sendEmbedMessageEmbed } = require('discord.js');

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for incoming messages
client.on('messageCreate', message => {
    if (message.content.startsWith('!ping')) {
        message.channel.send('Pong!');
    } else if (message.content.startsWith('!help')) {
        message.channel.send('Available commands: !ping, !help');
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
        console.error(`Error sending message to channel ${channelId}:`, error.message);
    }
}

/**
 * Sends an embed message to a specified Discord channel.
 * @param {string} channelId - The ID of the channel to send the embed message to.
 * @param {Object} embedData - The data for the embed message.
 */
async function sendEmbedMessage(channelId, embedData) {
    try {
        const channel = await client.channels.fetch(channelId);
        if (channel) {
            const embed = new MessageEmbed(embedData);
            await channel.send({ embeds: [embed] });
            console.log(`Embed message sent to channel ${channelId}`);
        } else {
            console.error(`Channel with ID ${channelId} not found.`);
        }
    } catch (error) {
        console.error(`Error sending embed message to channel ${channelId}:`, error.message);
    }
}

/**
 * Sends an embed message to a specified Discord channel.
 * @param {string} channelId - The ID of the channel to send the embed message to.
 * @param {Object} embedData - The data for the embed message.
 */
async function sendEmbedMessage(channelId, embedData) {
    try {
        const channel = await client.channels.fetch(channelId);
        if (channel) {
            const embed = new MessageEmbed(embedData);
            await channel.send({ embeds: [embed] });
            console.log(`Embed message sent to channel ${channelId}`);
        } else {
            console.error(`Channel with ID ${channelId} not found.`);
        }
    } catch (error) {
        console.error(`Error sending embed message to channel ${channelId}:`, error.message);
    }
}
client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = {
    sendMessage,
    sendEmbedMessage
};