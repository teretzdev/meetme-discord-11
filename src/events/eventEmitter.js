// src/events/eventEmitter.js

import { EventEmitter } from 'events';

// Create a new instance of EventEmitter
const eventEmitter = new EventEmitter();

/**
 * Export the eventEmitter instance for use in other modules.
 * This instance is used to emit and listen for events across the application.
 */
export default eventEmitter;