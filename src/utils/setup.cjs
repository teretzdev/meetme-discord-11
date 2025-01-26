// src/utils/setup.cjs

// Load environment variables from .env file
require('dotenv').config();

const amqplib = require('amqplib');
const mongoose = require('mongoose');
const { Logger } = require('./logger');
const logger = new Logger();

/**
 * Sets up a connection to RabbitMQ.
 * @returns {Promise<amqplib.Connection>} The RabbitMQ connection.
 */
async function setupRabbitMQ() {
    try {
        const connection = await amqplib.connect(process.env.RABBITMQ_URL);
        logger.info('Connected to RabbitMQ');
        return connection;
    } catch (error) {
        logger.error('Failed to connect to RabbitMQ:', error.message);
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
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Failed to connect to MongoDB:', error.message);
        throw error;
    }
}

/**
 * Sets up the environment by initializing connections to RabbitMQ and MongoDB.
 * @returns {Promise<void>}
 */
async function setup() {
    try {
        await setupRabbitMQ();
        await setupDatabase();
        logger.info('Environment setup complete');
    } catch (error) {
        logger.error('Environment setup failed:', error.message);
        throw error;
    }
}

module.exports = { setup };