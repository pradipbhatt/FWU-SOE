import express from "express";
import { getBook,addBook,deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
      res.send("Hello World");   
});

router.post("/addBook", addBook);
router.get("/getBook", getBook);
router.get("/deleteBook",deleteBook);

export default router;