// Import necessary modules
const EventEmitter = require('events');
const fetchMessages = require('./fetch_messages');
const processMessages = require('./process_messages');
const sendResponses = require('./send_responses');

// Initialize event emitter
const eventEmitter = new EventEmitter();

// Event listener for fetching messages
eventEmitter.on('fetchMessages', async () => {
  try {
    const messages = await fetchMessages();
    eventEmitter.emit('processMessages', messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
});

// Event listener for processing messages
eventEmitter.on('processMessages', (messages) => {
  try {
    const processedMessages = processMessages(messages);
    eventEmitter.emit('sendResponses', processedMessages);
  } catch (error) {
    console.error('Error processing messages:', error);
  }
});

// Event listener for sending responses
eventEmitter.on('sendResponses', async (processedMessages) => {
  try {
    await sendResponses(processedMessages);
    console.log('Responses sent successfully.');
  } catch (error) {
    console.error('Error sending responses:', error);
  }
});

// Start the application by emitting the first event
eventEmitter.emit('fetchMessages');
