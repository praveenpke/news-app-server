const express = require('express');
const routes = require('./routes'); // Adjusted path for the routes.js file

const app = express();
const PORT = process.env.PORT || 3000;

// Use the routes file for handling API calls
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
