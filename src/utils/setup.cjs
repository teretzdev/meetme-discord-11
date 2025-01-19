```javascript
// src/utils/setup.cjs

// Import necessary modules
const dotenv = require('dotenv');
const amqplib = require('amqplib');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Function to setup RabbitMQ connection
async function setupRabbitMQ() {
  try {
    const connection = await amqplib.connect(process.env.AMQP_URL);
    const channel = await connection.createChannel();
    console.log('RabbitMQ connected successfully.');
    return { connection, channel };
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
}

// Function to setup MongoDB connection
async function setupDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}

// Main setup function to initialize all services
async function setup() {
  try {
    await setupDatabase();
    const { connection, channel } = await setupRabbitMQ();
    // Additional setup logic can be added here if needed
    return { connection, channel };
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

// Execute the setup function
setup();

module.exports = setup;
```