// src/utils/setup.cjs

// Load environment variables from .env file
require('dotenv').config();

const amqplib = require('amqplib');
const mongoose = require('mongoose');

/**
 * Sets up a connection to RabbitMQ.
 * @returns {Promise<amqplib.Connection>} The RabbitMQ connection.
 */
async function setupRabbitMQ() {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        console.log('Connected to RabbitMQ');
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.RABBITMQ_QUEUE, { durable: true });
        console.log(`RabbitMQ channel and queue '${process.env.RABBITMQ_QUEUE}' set up successfully.`);
        return { connection, channel };
    } catch (error) {
        console.error('Failed to set up RabbitMQ:', error);
        throw error;
    }
}

/**
 * Sets up a connection to MongoDB.
 * @returns {Promise<void>}
 */
async function setupDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection established successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
}

/**
 * Sets up the environment by initializing connections to RabbitMQ and MongoDB.
 * @returns {Promise<void>}
 */
async function setup() {
    try {
        const { connection, channel } = await setupRabbitMQ();
        await setupDatabase();
        console.log('All services initialized successfully.');
    } catch (error) {
        console.error('Setup process encountered an error:', error.message);
        throw error;
    }
}

module.exports = { setup };