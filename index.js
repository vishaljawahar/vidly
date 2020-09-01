// Import the required modules
const express = require('express');
const app = express();
const logger = require('./startup/logging');

// Refactored imports
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// Initiate the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
