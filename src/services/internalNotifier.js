// src/services/internalNotifier.js

// Import the eventEmitter from the events module
const eventEmitter = require('../events/eventEmitter');
const fs = require('fs');
const path = require('path');
const { sendNotification } = require('../utils/notificationService');

// Define the path for the log file
const logFilePath = path.join(__dirname, '../../logs/processedMessages.log');

// Ensure the logs directory exists
if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

/**
 * Handles the 'messageProcessed' event.
 * Logs the processed message to the console and appends it to a log file.
 * @param {Array} processedMessages - The processed messages to handle.
 */
function handleProcessedMessage(processedMessages) {
    processedMessages.forEach(message => {
        const logEntry = `User: ${message.user}, Message: ${message.text}, Timestamp: ${message.timestamp}\\\n`;
        
        // Log to console
        console.log('Processed Message:', logEntry);

        // Append to log file
        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Failed to write to log file:', err);
            }
        });

        // Send notification
        sendNotification(`New message processed: ${message.text}`);

        // Handle alerts
        if (message.text.includes('urgent')) {
            console.warn('Alert: Urgent message detected!');
            eventEmitter.emit('urgentMessage', message);
        }
    });
}

// Set up the event listener for 'messageProcessed'
eventEmitter.on('messageProcessed', handleProcessedMessage);

// Listen for urgent messages
eventEmitter.on('urgentMessage', (message) => {
    console.log('Handling urgent message:', message);
    // Additional logic for urgent messages
});

console.log('Internal Notifier is listening for messageProcessed events.');