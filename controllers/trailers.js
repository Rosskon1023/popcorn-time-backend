// Require Dependencies
const express = require('express');

// Create a Route Object
const trailersRouter = express.Router();
const Trailer = require('../models/trailer.js');

// Routes
trailersRouter.get("/", (req,res) => {
    res.send("Welcome to Popcorn Time")
});

// Index 
trailersRouter.get("/trailers", async (req,res) => {
    try{
        res.json(await Trailer.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
});

// Delete
trailersRouter.delete("/mytrailers/:id", async (req,res) => {
    try {
        res.json(await Trailer.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});


// Create 
trailersRouter.post("/trailers", async (req,res) => {
    try {
        req.body[0].title = req.body[0].movieIdData.title;
        req.body[0].overview = req.body[0].movieIdData.overview;
        req.body[0].tagline = req.body[0].movieIdData.tagline;
        req.body[0].revenue = req.body[0].movieIdData.revenue;
        req.body[0].runtime = req.body[0].movieIdData.runtime;
        req.body[0].poster_path = req.body[0].movieIdData.poster_path;
        req.body[0].backdrop_path = req.body[0].movieIdData.backdrop_path;
        res.json(await Trailer.create(req.body))
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
});


// Show
trailersRouter.get("/mytrailers/:id", async (req,res) => {
    Trailer.findById(req.params.id, (error, foundTrailer) => {
        res.json(foundTrailer);
    });
});


// Export the Router/Controller Object
module.exports = trailersRouter;