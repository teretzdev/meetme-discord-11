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
    if (!process.env.RABBITMQ_URL) {
        console.log('RabbitMQ URL not set. Skipping RabbitMQ setup.');
        return null;
    }
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        console.log('Connected to RabbitMQ');
        return connection;
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
    }
}

/**
 * Sets up a connection to MongoDB.
 * @returns {Promise<void>}
 */
async function setupDatabase() {
    if (!process.env.MONGODB_URI) {
        console.log('MongoDB URI not set. Skipping MongoDB setup.');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

/**
 * Sets up the environment by initializing connections to RabbitMQ and MongoDB.
 * @returns {Promise<void>}
 */
async function setup() {
    try {
        const rabbitMQConnection = await setupRabbitMQ();
        const mongoDBConnection = await setupDatabase();
        if (rabbitMQConnection || mongoDBConnection) {
            console.log('Environment setup complete');
        } else {
            console.log('No connections were made. Check your environment configuration.');
        }
    } catch (error) {
        console.error('Environment setup failed:', error);
        throw error;
    }
}

module.exports = { setup };