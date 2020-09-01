// Imports
const Joi = require('Joi');

// Validation for objectID
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}