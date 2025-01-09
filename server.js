const express = require('express');
const cors = require('cors'); // Import cors
const routes = require('./routes'); // Adjusted path for the routes.js file

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Parse incoming JSON requests (optional, depending on your needs)
app.use(express.json());

// Use the routes file for handling API calls
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
