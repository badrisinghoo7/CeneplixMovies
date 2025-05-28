import connection from "./Config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./Routes/userRoutes.js";
import movieRouter from "./Routes/movieRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the cineplxx backend API server");
});
app.use("/api",authRouter)
app.use("/movies", movieRouter);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port ${PORT}`);
});
