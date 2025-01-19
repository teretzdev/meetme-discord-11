// schema.js

// Define a class for Message
class Message {
  constructor(id, text) {
    this.id = id; // Unique identifier for the message
    this.text = text; // The content of the message
  }
}

// Define a class for ProcessedMessage
class ProcessedMessage {
  constructor(id, responseText) {
    this.id = id; // Unique identifier for the processed message
    this.responseText = responseText; // The processed content of the message
  }
}

// Export the classes for use in other modules
module.exports = {
  Message,
  ProcessedMessage
};
