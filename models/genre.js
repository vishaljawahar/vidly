// Imports
const mongoose = require('mongoose');
const Joi = require('joi');

// Create a schema for the DB
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// Create a model of the schema
const Genre = mongoose.model('Genre', genreSchema);

// Validate the input genre
function validateGenre(genre) {
    const schema = Joi.object ({
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;