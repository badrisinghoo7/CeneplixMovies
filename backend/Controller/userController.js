import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';


const userRouter = express.Router();


const JWTSECRET = process.env.JWTSECRET || "propftx";

export const signup = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email, password, and name are required." });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Allow role to be set only if provided and is 'admin', otherwise default to 'user'
    const userRole = role === "admin" ? "admin" : "user";
    const user = new User({ email, password: hashedPassword, name, role: userRole });
    await user.save();
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    console.log(user, "User");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWTSECRET, { expiresIn: "1d" });
    return res.status(200).json({ message: "Login successful.", token ,user});
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// Example CRUD operations (Read, Update, Delete)
export const getUser = async (req, res) => {

  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export default userRouter;
