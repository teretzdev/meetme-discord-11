const mongoose = require('mongoose');

// Define the schema for a message
const messageSchema = new mongoose.Schema({
    user: {
        username: { type: String, required: true },
        userId: { type: String, required: true }
    },
    aiResponse: { type: String, required: true },
    messageContent: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Create the model from the schema
const Message = mongoose.model('Message', messageSchema);

// Export the model
module.exports = Message;
