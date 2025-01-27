// src/utils/setup.cjs

import dotenv from 'dotenv';
dotenv.config();

validateEnvironmentVariables();

import amqplib from 'amqplib';
import mongoose from 'mongoose';

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
 * Validates the presence and validity of required environment variables.
 * Throws an error if any required variables are missing or invalid.
 */
function validateEnvironmentVariables() {
    const requiredVariables = [
        'RABBITMQ_URL',
        'MONGODB_URI',
        'AI_API_KEY',
        'AI_API_URL'
    ];

    const missingVariables = requiredVariables.filter(varName => !process.env[varName]);

    if (missingVariables.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
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
    try {
        await setupRabbitMQ();
        await setupDatabase();
        console.log('Environment setup complete');
    } catch (error) {
        console.error('Environment setup failed:', error);
        throw error;
    }
}

export { setup };