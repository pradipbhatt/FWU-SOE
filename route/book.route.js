import express from "express";
import { getBook, addBook, deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/getBook", getBook);
router.post("/addBook", addBook);
router.delete("/deleteBook/:id", deleteBook); // Specify the parameter ':id' for DELETE request

export default router;
