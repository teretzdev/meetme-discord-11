import React, { useEffect, useState } from 'react';
import eventEmitter from '../../events/eventEmitter';

/**
 * AIProcessor component to display AI-processed messages with sentiment analysis.
 * Listens for 'messageProcessed' events and updates the displayed AI-processed messages.
 */
function AIProcessor() {
    const [processedMessages, setProcessedMessages] = useState([]);

    useEffect(() => {
        // Event listener for 'messageProcessed' to update AI-processed messages
        const handleMessagesProcessed = (messages) => {
            setProcessedMessages(messages);
        };

        eventEmitter.on('messageProcessed', handleMessagesProcessed);

        // Cleanup event listener on component unmount
        return () => {
            eventEmitter.off('messageProcessed', handleMessagesProcessed);
        };
    }, []);

    return (
        <div className="ai-processor">
            <ul>
                {processedMessages.map((message, index) => (
                    <li key={index} className="ai-message">
                        <p>
                            <strong>{message.user}</strong>: {message.text}
                        </p>
                        <p className="sentiment">
                            Sentiment: <span>{message.sentiment}</span>
                        </p>
                        <span className="timestamp">{message.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AIProcessor;
