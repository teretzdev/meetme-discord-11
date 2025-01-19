# meetme-discord-11

## Introduction
MeetMe-Discord-11 is an event-driven application that integrates existing code repositories to fetch, process, and send messages using the MeetMe API. This architecture ensures efficient and scalable handling of messages by reacting to events as they occur.

## Setup and Running the Application
1. Clone the repository:
   ```bash
   git clone https://github.com/teretzdev/meetme-discord-11.git
   ```
2. Navigate to the project directory:
   ```bash
   cd meetme-discord-11
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the MeetMe API client with your credentials in `main.py`. Ensure that all necessary environment variables or configuration files are set up as required by the integrated code.
5. Run the application:
   ```bash
   python main.py
   ```

## Data Schema Overview
The application uses a consistent data schema defined in `schema.py`:
- `Message`: Represents a message with attributes such as `message_id`, `content`, `sender`, and `timestamp`.
- `Event`: Encapsulates events with `event_type`, `data` (a list of `Message` objects), and `timestamp`.
- `Response`: Represents a response with `response_id`, `content`, `recipient`, `timestamp`, and `status` (defaulting to "pending").

## Event-Driven System
The application is structured around three main modules, each integrated from existing repositories:
1. **Fetching**: `fetch_messages.py` - Fetches messages from the MeetMe API and emits a `messages_fetched` event.
2. **Processing**: `process_messages.py` - Processes the fetched messages and emits a `messages_processed` event.
3. **Sending**: `send_responses.py` - Sends the processed responses to the users.

Each module listens for specific events and triggers the next step in the workflow, ensuring a seamless and reactive message handling process. The `EventListener` is used to manage these events, providing a robust and flexible event-driven architecture.