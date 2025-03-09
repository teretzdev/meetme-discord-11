import React from 'react';
import apiService from '../../services/apiService';

/**
 * Controls component to provide buttons for triggering actions like fetching messages,
 * processing them, and updating the chat history.
 */
function Controls() {
    // Function to fetch messages using the API service
    const handleFetchMessages = async () => {
        try {
        const messages = await apiService.fetchMessages();
            console.log('Messages fetched:', messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
    };

    // Function to process messages using the API service
    const handleProcessMessages = async () => {
        
    try {
        const messagesToProcess = []; // Replace with actual messages to process
        const processedMessages = await apiService.processMessages(messagesToProcess);
        console.log('Messages processed:', processedMessages);
    } catch (error) {
        console.error('Error processing messages:', error);
    }};

    // Function to update history using the API service
    const handleUpdateHistory = async () => {
        try {
        const historyData = []; // Replace with actual history data to update
        await apiService.updateHistory(historyData);
        console.log('History updated successfully');
    } catch (error) {
        console.error('Error updating history:', error);
    }
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