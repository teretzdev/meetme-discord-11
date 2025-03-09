import React, { useEffect, useState } from 'react';
import eventEmitter from '../events/eventEmitter';

/**
 * HistoryViewer component to display the updated chat history from Google Sheets.
 * Listens for 'messageProcessed' events and updates the displayed chat history.
 */
function HistoryViewer() {
    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        // Event listener for 'messageProcessed' to update chat history
        const handleHistoryUpdate = (messages) => {
            setChatHistory((prevHistory) => [...prevHistory, ...messages]);
        };

        eventEmitter.on('messageProcessed', handleHistoryUpdate);

        // Cleanup event listener on component unmount
        return () => {
            eventEmitter.off('messageProcessed', handleHistoryUpdate);
        };
    }, []);

    return (
        <div className="history-viewer">
            <ul>
                {chatHistory.map((message, index) => (
                    <li key={index} className="history-message">
                        <p>
                            <strong>{message.user}</strong>: {message.text}
                        </p>
                        <span className="timestamp">{message.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryViewer;