# meetme-discord-11

## Introduction
MeetMe-Discord-11 is an event-driven application designed to fetch, process, and send messages using the MeetMe API. This architecture ensures efficient handling of messages by reacting to events as they occur.

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
4. Initialize the MeetMe API client with your credentials in `main.py`.
5. Run the application:
   ```bash
   python main.py
   ```

## Data Schema Overview
The application uses a consistent data schema defined in `schema.py`:
- `Message`: Represents a message with attributes like `message_id`, `content`, `sender`, and `timestamp`.
- `Event`: Encapsulates events with `event_type`, `data`, and `timestamp`.
- `Response`: Represents a response with `response_id`, `content`, `recipient`, and `timestamp`.

## Event-Driven System
The application is structured around three main modules:
1. **Fetching**: `fetch_messages.py` - Fetches messages from the MeetMe API and emits a `messages_fetched` event.
2. **Processing**: `process_messages.py` - Processes the fetched messages and emits a `messages_processed` event.
3. **Sending**: `send_responses.py` - Sends the processed responses to the users.

Each module listens for specific events and triggers the next step in the workflow, ensuring a seamless and reactive message handling process.