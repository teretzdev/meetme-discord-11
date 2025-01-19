# main.py

from fetch_messages import MessageFetcher
from process_messages import MessageProcessor
from send_responses import ResponseSender
from schema import Event
from event_listener import EventListener  # Assuming an event listener module

# Assuming meetme_api_client is an instance of a client that can fetch and send messages
meetme_api_client = None  # Replace with actual client initialization

def main():
    # Initialize components
    fetcher = MessageFetcher(meetme_api_client)
    processor = MessageProcessor()
    sender = ResponseSender(meetme_api_client)

    # Set up event listener
    event_listener = EventListener()

    # Register event handlers
    event_listener.register_event("fetch_messages", fetcher.on_fetch_messages_event)
    event_listener.register_event("messages_fetched", processor.on_messages_fetched_event)
    event_listener.register_event("messages_processed", sender.on_messages_processed_event)

    # Simulate triggering the fetch messages event
    event_listener.trigger_event("fetch_messages", {})

if __name__ == "__main__":
    main()