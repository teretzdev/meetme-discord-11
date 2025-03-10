import express from 'express';
import eventEmitter from './src/events/eventEmitter.js';
import { fetchMessages } from './fetchMessages.js';
import AIAgent from './src/agents/aiAgent.js';
import { Logger } from './src/utils/logger.js';

const app = express();
const PORT = process.env.PORT || 2090;
const logger = new Logger();
const aiProvider = process.env.AI_PROVIDER || 'default';
const aiAgent = new AIAgent(aiProvider);

// Middleware to parse JSON requests
app.use(express.json());

// Route to fetch messages
app.get('/fetch', async (req, res) => {
    try {
        await fetchMessages();
        res.status(200).send({ message: 'Messages fetched successfully.' });
    } catch (error) {
        logger.error('Error fetching messages:', error.message);
        res.status(500).send({ error: 'Failed to fetch messages.' });
    }
});

// Route to process messages
app.post('/process', async (req, res) => {
    try {
        const { messages } = req.body;
        if (!Array.isArray(messages)) {
            return res.status(400).send({ error: 'Invalid input. Expected an array of messages.' });
        }

        const processedMessages = await Promise.all(
            messages.map(async (message) => {
                const aiResponse = await aiAgent.sendMessage(message.text);
                return {
                    user: message.user,
                    text: aiResponse.responseText,
                    sentiment: aiResponse.sentiment,
                    timestamp: message.timestamp,
                };
            })
        );

        eventEmitter.emit('messageProcessed', processedMessages);
        res.status(200).send({ message: 'Messages processed successfully.', processedMessages });
    } catch (error) {
        logger.error('Error processing messages:', error.message);
        res.status(500).send({ error: 'Failed to process messages.' });
    }
});

// Route to listen for events
app.get('/events', (req, res) => {
    res.status(200).send({ message: 'Event-driven architecture is active.' });
});

const startupTime = new Date().toISOString();
logger.info(`Starting server initialization at ${startupTime}`);

// Start the server
app.listen(PORT, () => {
    const startupTime = new Date().toISOString();
    logger.info(`Server is starting at ${startupTime}`);
    logger.info(`Server is running on http://localhost:${PORT}`);
    logger.info(`Server initialized successfully with AI Provider: ${aiProvider}`);
});