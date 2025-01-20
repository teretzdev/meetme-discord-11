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
    let rabbitMQConnected = false;
    let mongoDBConnected = false;

    try {
        await setupRabbitMQ();
        rabbitMQConnected = true;
        console.log('RabbitMQ setup complete');
    } catch (error) {
        console.error('RabbitMQ setup failed:', error);
    }

    try {
        await setupDatabase();
        mongoDBConnected = true;
        console.log('MongoDB setup complete');
    } catch (error) {
        console.error('MongoDB setup failed:', error);
    }

    if (rabbitMQConnected || mongoDBConnected) {
        console.log('Environment setup complete with available services');
    } else {
        console.error('Environment setup failed: No services available');
        throw new Error('No services available');
    }
}

module.exports = { setup };