import React, { useEffect, useState } from 'react';
import eventEmitter from '../events/eventEmitter';

/**
 * ChatViewer component to display chat messages fetched from MeetMe.
 * Listens for 'messageFetched' events and updates the displayed chat messages.
 */
function ChatViewer() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch initial messages from the backend
        const fetchInitialMessages = async () => {
            try {
                const response = await fetch('/fetch');
                const data = await response.json();
                setMessages(data.messages || []);
            } catch (error) {
                console.error('Error fetching initial messages:', error);
            }
        };

        fetchInitialMessages();

        // Event listener for 'messageFetched' to update chat messages
        const handleMessagesFetched = (chatData) => {
            setMessages(chatData);
        };

        eventEmitter.on('messageFetched', handleMessagesFetched);

        // Cleanup event listener on component unmount
        return () => {
            eventEmitter.off('messageFetched', handleMessagesFetched);
        };
    }, []);

    return (
        <div className="chat-viewer">
            <ul>
                {messages.map((message, index) => (
                    <li key={index} className="chat-message">
                        <p><strong>{message.user}</strong>: {message.text}</p>
                        <span className="timestamp">{message.timestamp}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatViewer;