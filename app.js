// app.js

import { fetchData } from './fetch/dataFetcher.js';

// Fetch data from a sample API and log it to the console
const url = 'https://api.example.com/data'; // Replace with a real API endpoint
fetchData(url)
    .then(data => console.log('Fetched data:', data))
    .catch(error => console.error('Error:', error));