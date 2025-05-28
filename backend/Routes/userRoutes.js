

import express from "express";
import { signup, login, getUser, updateUser, deleteUser } from "../Controller/userController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
// import { signup, login, getUser, updateUser, deleteUser } from "../Controllers/userController.js";

const authRouter = express.Router();

// Signup
authRouter.post("/signup", signup);
// Login
authRouter.post("/login", login);
// Get user by ID
authRouter.get("/getuser", authMiddleware, getUser);
// Update user by ID
authRouter.put("/updateuser", authMiddleware, updateUser);
// Delete user by ID
authRouter.delete("/deleteuser", authMiddleware, deleteUser);

export default authRouter;








