import express from "express";
import { signup, login } from "../controller/user.controller.js";

const router = express.Router();

// Signup and login routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
