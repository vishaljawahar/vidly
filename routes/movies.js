// Imports
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');

router.use(express.json());

// GET all movies
router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

// POST a movie

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre');

    const movie = new Movie({
        title: req.body.title,
        genre : {
            _id:genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

module.exports = router;