// Imports
const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.use(express.json());

// GET all the customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// GET a single customer
router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('Customer with the given ID was not found');

    res.send(customer);
});

// POST a new customer
router.post('/', async(req, res) => {
    //validate the request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //add the customer
    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    await customer.save();
    res.send(customer);
});

module.exports = router;