// Require Dependencies
const express = require('express');

const admin = require('firebase-admin');

// const serviceAccount = require('../service-account-credentials.json');
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Authenticated Function
async function isAuthenticated(req,res,next) {
    try {
        const token = req.get('Authorization');
        if(!token) throw new Error('You must be logged in')
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if(!user) throw new Error('something went wrong');
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// Create a Route Object
const trailersRouter = express.Router();
const Trailer = require('../models/trailer.js');

// Routes
trailersRouter.get("/", (req,res) => {
    res.send("Welcome to Popcorn Time")
});

// Index 
trailersRouter.get("/trailers", isAuthenticated, async (req,res) => {
    try{
        res.json(await Trailer.find({uId: req.user.uid}))
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
trailersRouter.post("/trailers", isAuthenticated, async (req,res) => {
    try {
        req.body[0].uId = req.user.uid;
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