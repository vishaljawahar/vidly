// Imports
const mongoose = require('mongoose');
const logger = require('./logging');
const config = require('config');

// Connect to the MongoDB
module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => logger.info(`Connected to the ${db}...`));
}

