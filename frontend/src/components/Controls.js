import React from 'react';
import eventEmitter from '../../events/eventEmitter';

/**
 * Controls component to provide buttons for triggering actions like fetching messages,
 * processing them, and updating the chat history.
 */
function Controls() {
    // Function to emit 'fetchMessages' event
    const handleFetchMessages = () => {
        eventEmitter.emit('fetchMessages');
        console.log('fetchMessages event emitted');
    };

    // Function to emit 'processMessages' event
    const handleProcessMessages = () => {
        eventEmitter.emit('processMessages');
        console.log('processMessages event emitted');
    };

    // Function to emit 'updateHistory' event
    const handleUpdateHistory = () => {
        eventEmitter.emit('updateHistory');
        console.log('updateHistory event emitted');
    };

    return (
        <div className="controls">
            <button onClick={handleFetchMessages} className="control-button">
                Fetch Messages
            </button>
            <button onClick={handleProcessMessages} className="control-button">
                Process Messages
            </button>
            <button onClick={handleUpdateHistory} className="control-button">
                Update History
            </button>
        </div>
    );
}

export default Controls;
