// src/models/messageModel.js

const mongoose = require('mongoose');

// Define the schema for storing messages
const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    aiResponse: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Mongoose model
const Message = mongoose.model('Message', messageSchema);

// Export the model
module.exports = Message;
