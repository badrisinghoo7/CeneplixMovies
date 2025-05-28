import Movie from "../Model/movieModel.js";

// Create a new movie (Admin only)
export const createMovie = async (req, res) => {
    try {
        console.log(req.body,"Movies");
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all movies (Public)
export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single movie by ID (Public)
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a movie (Admin only)
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a movie (Admin only)
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ error: "Movie not found" });
        res.json({ message: "Movie deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
