import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    director: { type: String },
    releaseYear: { type: Number },
    genre: { type: String },
    avatar: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
