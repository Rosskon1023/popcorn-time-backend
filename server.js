// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Add Controllers
const trailersController = require('./controllers/trailers.js');


// Initialize the Application
const app = express();


// Configure Application Settings
const {PORT, DATABASE_URL} = process.env;


// Connect to and Configure the Database
mongoose.connect(DATABASE_URL);


// Set up Database Listeners
mongoose.connection
    .on("open", () => console.log("Connected to MongoDB"))
    .on("close", () => console.log("Disconnected from MongoDB"))
    .on("error", () => console.log(error))

// Mount Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Mount Routes
app.use('/', trailersController);


// Application Listener
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));