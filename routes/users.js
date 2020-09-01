// Imports
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');

router.use(express.json());

// GET all genres
router.get('/me', auth, async (req, res) => {
    const user = await (User.findById(req.user._id)).select('-password');
    res.send(user);
});

// POST a new genre
router.post('/', async (req, res) => {
    // validate the input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body,['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));
});

// PUT an update to the genre
router.put('/:id', async (req, res) => {
    // Validate the genre
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find if the genre exists; if yes, update it
    const user = await User.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if (!user) return res.status(404).send('Given genre not found');

    res.send(user);
});

// DELETE a genre
router.delete('/:id', async (req, res) => {
    //check if the genre exist; if yes, delete it
    const user = await User.findByIdAndRemove(req.params.id)
    
    if (!user) return res.status(404).send('Given genre is not found');

    res.send(user);
});


// Export the module
module.exports = router;