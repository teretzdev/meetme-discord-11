// src/utils/logger.js

// Logger utility to handle logging throughout the application

class Logger {
  static info(message) {
    console.log(`INFO: ${message}`);
  }

  static warn(message) {
    console.warn(`WARN: ${message}`);
  }

  static error(message) {
    console.error(`ERROR: ${message}`);
  }
}

// Export the Logger class for use in other modules
export default Logger;
