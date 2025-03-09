import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Create the root element for the React application
const rootElement = document.getElementById('root');

// Ensure the root element exists before rendering
if (!rootElement) {
    throw new Error("Root element with id 'root' not found. Please ensure your HTML file contains a div with id 'root'.");
}

// Create a React root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
