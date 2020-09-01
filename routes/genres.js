// Imports
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const logger = require('../startup/logging');
require('express-async-errors');
const validateObjectId = require('../middleware/validateObjectId');

router.use(express.json());

// GET all genres
router.get('/', (async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));

// GET specific genres by ID
router.get('/:id', validateObjectId, async (req, res) => {
    // Check if the genre exists; if yes, return it
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('Given genre(ID) not found');

    res.send(genre);
});

// POST a new genre
router.post('/', auth, async (req, res) => {
    // validate the input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // add the genre
    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});

// PUT an update to the genre
router.put('/:id', auth, async (req, res) => {
    // Validate the genre
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find if the genre exists; if yes, update it
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if (!genre) return res.status(404).send('Given genre not found');

    res.send(genre);
});

// DELETE a genre
router.delete('/:id', [auth, admin], async (req, res) => {
    //check if the genre exist; if yes, delete it
    const genre = await Genre.findByIdAndRemove(req.params.id)
    
    if (!genre) return res.status(404).send('Given genre is not found');

    res.send(genre);
});

// Export the module
module.exports = router;