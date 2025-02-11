import express from 'express';

// Create an Express application
const app = express();

// Define a route handler for GET requests to '/'
app.get('/', (req, res) => {
    res.send('Application is running');
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
