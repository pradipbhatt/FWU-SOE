import express from "express";
import { signup, login, getUsers, deleteUser, updateUser } from "../controller/user.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Signup and login routes (admin only for signup)
router.post("/signup", isAdmin, signup);
router.post("/login", login);

// Admin routes for managing users
router.get("/users", isAdmin, getUsers);
router.delete("/users/:id", isAdmin, deleteUser);
router.put("/users/:id", isAdmin, updateUser); // Route for updating a user

export default router;
