// Imports
const Joi = require('joi');

// Validation for objectID
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}