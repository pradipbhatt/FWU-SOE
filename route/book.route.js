import express from "express";
// import { getBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
      res.send("Hello World");   
});

export default router;