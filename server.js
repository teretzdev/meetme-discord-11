import express from 'express';

// Create an Express application
const app = express();

app.use(express.static('public'));

// Define a route handler for GET requests to '/'
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});