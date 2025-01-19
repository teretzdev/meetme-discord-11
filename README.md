# meetme-discord-11

## Overview
This project is a Node.js application designed for the MeetMe Discord application. It serves as a basic setup to ensure the Node.js environment is correctly configured.

## Prerequisites
- Node.js and npm should be installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

## Installation
To install the necessary dependencies, run the following command in the project directory:

```bash
npm install
```

## Running the Application
You can start the application using either of the following commands:

```bash
npm start
```

or

```bash
node app.js
```

These commands will execute the `app.js` file, which now fetches data from a specified API and logs it to the console, verifying that the Node.js environment is set up correctly.

## Data Fetching Functionality
The application includes a data fetching module located in `fetch/dataFetcher.js`. This module provides a `fetchData` function that can be used to perform HTTP GET requests to fetch data from an API.

### Example Usage
To use the `fetchData` function, ensure you have a valid API endpoint. The function can be called as follows:

```javascript
import { fetchData } from './fetch/dataFetcher.js';

const url = 'https://api.example.com/data'; // Replace with a real API endpoint
fetchData(url)
    .then(data => console.log('Fetched data:', data))
    .catch(error => console.error('Error:', error));
```

This example demonstrates how to fetch data from an API and log the results to the console.