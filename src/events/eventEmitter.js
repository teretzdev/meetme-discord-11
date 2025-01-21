// src/events/eventEmitter.js

// Import the EventEmitter class from the 'events' module
const EventEmitter = require('events');

// Create a new instance of EventEmitter
const eventEmitter = new EventEmitter();

// Export the instance for use in other modules
module.exports = eventEmitter;
