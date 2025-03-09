# Frontend - MeetMe Chat Integration

This README provides instructions for setting up and running the frontend of the MeetMe Chat Integration project. The frontend is built using React and provides a graphical user interface (GUI) for interacting with chat data, AI-processed messages, and chat history.

## Prerequisites

Before setting up the frontend, ensure the following are installed on your system:

- **Node.js** (v16 or higher) and npm: [Download Node.js](https://nodejs.org/)
- A backend server for the MeetMe Chat Integration project should be running.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/teretzdev/meetme-discord-11.git
   cd meetme-discord-11/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the frontend application using the following command:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

   The application should now be running, and you can interact with the GUI.

3. If you want to run both the frontend and backend together, use the following command from the root directory:
   ```bash
   npm run dev

## Project Structure

The frontend project is organized as follows:

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatViewer.js       # Displays chat messages fetched from MeetMe
│   │   ├── AIProcessor.js      # Displays AI-processed messages with sentiment analysis
│   │   ├── HistoryViewer.js    # Displays the updated chat history from Google Sheets
│   │   ├── Controls.js         # Provides buttons for triggering actions
│   ├── App.js                  # Main App component
│   ├── index.js                # Entry point for the React application
│   ├── styles.css              # CSS file for styling the components
├── README.md                   # Documentation for the frontend
```

## Features

- **Chat Viewer**: Displays chat messages fetched from the MeetMe platform.
- **AI Processor**: Shows AI-processed messages with sentiment analysis.
- **History Viewer**: Displays the chat history updated in Google Sheets.
- **Controls**: Provides buttons to fetch messages, process them, and update the chat history.

## Event-Driven Architecture

The frontend listens for events emitted by the backend and updates the UI accordingly. Key events include:

- `messageFetched`: Updates the Chat Viewer with new messages.
- `messageProcessed`: Updates the AI Processor and History Viewer with processed messages.

## Styling

The application uses a single CSS file (`styles.css`) for styling. The styles are modular and scoped to specific components.

## Troubleshooting

- If the application does not start, ensure the backend server is running and accessible.
- Check the browser console for any errors and ensure all dependencies are installed.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the ISC License. See the root `LICENSE` file for more details.