# fetch_messages.py

from datetime import datetime
from schema import Message, Event
from event_listener import EventListener  # Assuming an event listener module

class MessageFetcher:
    def __init__(self, meetme_api_client):
        self.meetme_api_client = meetme_api_client

    def on_fetch_messages_event(self, event_data):
        # Fetch messages when an event is triggered
        raw_messages = self.meetme_api_client.get_messages()
        
        # Convert raw messages to Message objects
        messages = [
            Message(
                message_id=msg['id'],
                content=msg['content'],
                sender=msg['sender'],
                timestamp=datetime.fromisoformat(msg['timestamp'])
            )
            for msg in raw_messages
        ]
        
        # Create an event for the fetched messages
        event = Event(
            event_type="messages_fetched",
            data=messages,
            timestamp=datetime.now()
        )
        
        # Emit the event
        self.emit_event(event)

    def emit_event(self, event):
        # Placeholder for event emission logic
        # In a real application, this could be a call to an event bus or message queue
        print(f"Event emitted: {event}")

# Example usage
if __name__ == "__main__":
    # Assuming meetme_api_client is an instance of a client that can fetch messages
    meetme_api_client = None  # Replace with actual client initialization
    fetcher = MessageFetcher(meetme_api_client)
    
    # Set up event listener
    event_listener = EventListener()
    event_listener.register_event("fetch_messages", fetcher.on_fetch_messages_event)
    
    # Simulate triggering the event
    event_listener.trigger_event("fetch_messages", {})