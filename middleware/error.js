// Imports
const logger = require('../startup/logging');

// Middleware function to handle the errors from the routes
module.exports = function(err, req, res, next) {
    logger.error(err.message, err)
    res.status(500).send('System failure. Please contact your admin');
}