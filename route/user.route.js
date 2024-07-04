import express from "express";
import { signup, login } from "../controller/user.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Signup and login routes (admin only for signup)
router.post("/signup", isAdmin, signup);
router.post("/login", login);

export default router;
