# process_messages.py

from datetime import datetime
from schema import Message, Event, Response

class MessageProcessor:
    def __init__(self):
        pass

    def on_messages_fetched_event(self, event_data):
        if event_data.event_type != "messages_fetched":
            print("Unsupported event type")
            return

        messages = event_data.data
        responses = []

        for message in messages:
            # Simulate processing logic
            response_content = self.generate_response(message.content)
            response = Response(
                response_id=f"resp_{message.message_id}",
                content=response_content,
                recipient=message.sender,
                timestamp=datetime.now()
            )
            responses.append(response)

        # Create an event for the processed responses
        response_event = Event(
            event_type="messages_processed",
            data=responses,
            timestamp=datetime.now()
        )

        # Emit the event
        self.emit_event(response_event)

    def generate_response(self, message_content):
        # Placeholder for actual response generation logic
        return f"Processed: {message_content}"

    def emit_event(self, event):
        # Placeholder for event emission logic
        # In a real application, this could be a call to an event bus or message queue
        print(f"Event emitted: {event}")

# Example usage
if __name__ == "__main__":
    # Simulate receiving an event with fetched messages
    fetched_event = Event(
        event_type="messages_fetched",
        data=[
            Message(message_id="1", content="Hello", sender="User1", timestamp=datetime.now()),
            Message(message_id="2", content="How are you?", sender="User2", timestamp=datetime.now())
        ],
        timestamp=datetime.now()
    )

    processor = MessageProcessor()
    # Set up event listener
    event_listener = EventListener()
    event_listener.register_event("messages_fetched", processor.on_messages_fetched_event)

    # Simulate triggering the event
    event_listener.trigger_event("messages_fetched", fetched_event)