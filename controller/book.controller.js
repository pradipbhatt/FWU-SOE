import Book from "../model/book.model.js";

const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(deletedBook);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { getBook, addBook, deleteBook };
