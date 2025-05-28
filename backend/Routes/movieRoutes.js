import express from "express";
import {
    createMovie,
    getMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from "../Controller/movieController.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const movieRouter = express.Router();

// Public: Get all movies
movieRouter.get("/", authMiddleware, getMovies);
// Public: Get movie by ID
movieRouter.get("/:id", authMiddleware, getMovieById);


// Authenticated users (including admin) can create, update, delete movies
movieRouter.post("/",authMiddleware, adminMiddleware, createMovie);
movieRouter.put("/:id",authMiddleware, adminMiddleware, updateMovie);
movieRouter.delete("/:id",authMiddleware, adminMiddleware, deleteMovie);

export default movieRouter;
