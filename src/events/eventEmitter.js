// src/events/eventEmitter.js

// Import the EventEmitter class from the 'events' module
const EventEmitter = require('events');

// Create a new instance of EventEmitter
const eventEmitter = new EventEmitter();

/**
 * Export the eventEmitter instance for use in other modules.
 * This instance is used to emit and listen for events across the application.
 */
module.exports = eventEmitter;