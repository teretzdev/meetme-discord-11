# main.py

from fetch_messages import MessageFetcher
from process_messages import MessageProcessor
from send_responses import ResponseSender
from schema import Event
from event_listener import EventListener  # Assuming an event listener module

# Initialize the MeetMe API client with the correct credentials and parameters
meetme_api_client = MeetMeApiClient(api_key="your_api_key", base_url="https://api.meetme.com")

def main():
    # Initialize components
    fetcher = MessageFetcher(meetme_api_client)
    processor = MessageProcessor()
    sender = ResponseSender(meetme_api_client)

    # Set up event listener
    event_listener = EventListener()

    # Register event handlers
    event_listener.register_handler("fetch_messages", fetcher.on_fetch_messages_event)
    event_listener.register_handler("messages_fetched", processor.on_messages_fetched_event)
    event_listener.register_handler("messages_processed", sender.on_messages_processed_event)

    # Start the event-driven process by triggering the fetch messages event
    event_listener.emit_event("fetch_messages", {})

if __name__ == "__main__":
    main()