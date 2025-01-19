# main.py

from fetch_messages import MessageFetcher
from process_messages import MessageProcessor
from send_responses import ResponseSender
from schema import Event

# Assuming meetme_api_client is an instance of a client that can fetch and send messages
meetme_api_client = None  # Replace with actual client initialization

def main():
    # Initialize components
    fetcher = MessageFetcher(meetme_api_client)
    processor = MessageProcessor()
    sender = ResponseSender(meetme_api_client)

    # Fetch messages
    fetched_event = fetcher.fetch_messages()

    # Process messages
    if fetched_event and fetched_event.event_type == "messages_fetched":
        processed_event = processor.process_messages(fetched_event)

        # Send responses
        if processed_event and processed_event.event_type == "messages_processed":
            sender.send_responses(processed_event)

if __name__ == "__main__":
    main()
