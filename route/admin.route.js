import express from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import { getUsers } from "../controller/admin.controller.js";

const router = express.Router();

// Route to get all users (admin only)
router.get("/users", isAdmin, getUsers);

export default router;
