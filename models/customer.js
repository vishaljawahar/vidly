// Imports
const mongoose = require('mongoose');
const Joi = require('joi');

// Create a customer schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        length: 10
    }
});

// Create a model from the schema
const Customer = mongoose.model('Customer', customerSchema);

// Validate the customer
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;