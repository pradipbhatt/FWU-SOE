import express from "express";
import { getUsers, deleteUser, updateUser } from "../controller/user.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Route to get all users (admin only)
router.get("/users", isAdmin, getUsers);

// Route to delete a user (admin only)
router.delete("/:id", isAdmin, deleteUser);

// Route to update a user (admin only)
router.put("/updateUser", isAdmin, updateUser);

export default router;
