const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrailerSchema = new Schema({
    uId: String,
    title: String,
    overview: String,
    tagline: String,
    revenue: String,
    runtime: String,
    videoKey: String,
    poster_path: String,
    backdrop_path: String
}, {timestamps: true});

const Trailer = mongoose.model("Trailer", TrailerSchema);

module.exports = Trailer;