// src/events/eventEmitter.js

// Import the EventEmitter class from the 'events' module
const EventEmitter = require('events');

// Create a new instance of EventEmitter
const eventEmitter = new EventEmitter();

/**
 * Export the eventEmitter instance for use across all modules.
 * This ensures consistent event-driven communication throughout the application.
 */
module.exports = eventEmitter;