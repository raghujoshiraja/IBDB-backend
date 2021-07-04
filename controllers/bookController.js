// Imports
const Books = require("../models/BookSchema");
const Authors = require("../models/AuthorSchema");

// Book Controller
const bookController = {
  // Get all boooks
  getBooks: async (req, res) => {
    try {
      // Fetch all books from db
      const allBooks = await Books.find();

      // Respond with the Book details
      res.json(allBooks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Get a book by id
  getSingleBook: async (req, res) => {
    try {
      // Extract id from query url
      const { id } = req.params;

      // Validate the ID
      if (id.length !== 24 || !(await Books.exists({ _id: id })))
        return res.status(400).json({ message: "Unable to verify the ID" });

      // Fetch the book
      const book = await Books.findById(id);

      // Respond as JSON
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addBook: async (req, res) => {
    try {
      // Extract important information from the body
      const { title, genre, pageCount, authorId, description } = req.body;

      // Validate the fields
      // TODO
      if (
        typeof pageCount !== "number" ||
        !title ||
        !genre ||
        !authorId ||
        !description
      )
        return res.status(400).json({
          message:
            "Cannot validate the provided fields. Please remember to provide valid fields.",
        });
      // Check if author exists
      if (authorId.length !== 24 || !(await Authors.exists({ _id: authorId })))
        return res.status(400).json({
          message: "The author Id does not exist",
        });

      // Create a new entry
      const newBook = new Books({
        title,
        genre,
        pageCount,
        authorId,
        description,
      });
      // Save the book to database
      const book = await newBook.save();

      // Respond with success message
      // res.json({ message: "New book saved" });
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Edit Signle Book
  editSingleBook: async (req, res) => {
    try {
      // Extract id from query url
      const { id } = req.params;

      // Validate the ID
      if (id.length !== 24 || !(await Books.exists({ _id: id })))
        return res.status(400).json({ message: "Unable to verify the ID" });

      // Fetch the book
      await Books.findByIdAndUpdate(id, {
        $set: req.body,
      });

      // Respond as JSON
      res.json({ message: "Updated the book" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Delete Signle Book
  deleteSingleBook: async (req, res) => {
    try {
      // Extract id from query url
      const { id } = req.params;

      // Validate the ID
      if (id.length !== 24 || !(await Books.exists({ _id: id })))
        return res.status(400).json({ message: "Unable to verify the ID" });

      // Delete from database
      await Books.findByIdAndDelete(id);

      // Respond as JSON
      res.json({ message: "Deleted the book" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = bookController;
