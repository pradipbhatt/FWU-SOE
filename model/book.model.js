import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    Id: { type: String, required: true },
    bookTitle: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdTime: { type: Date, default: Date.now },
    image: { type: String, required: true },
    pdfLink: { type: String, required: true },
    semester: { type: String, required: true } // Added semester field
  },);
const Book = mongoose.model("Book", bookSchema);

export default Book;