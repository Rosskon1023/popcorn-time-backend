// Require Dependencies
const express = require('express');

// Create a Route Object
const trailersRouter = express.Router();
const Trailer = require('../models/trailer.js');

// Routes
trailersRouter.get("/", (req,res) => {
    res.send("Welcome to Popcorn Time")
});


// Export the Router/Controller Object
module.exports = trailersRouter;