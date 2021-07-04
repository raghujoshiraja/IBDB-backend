// Imports
const Authors = require("../models/AuthorSchema");

// Author Controllers
const authorController = {
  getAuthors: async (req, res) => {
    try {
      // Fethc from database
      const authors = await Authors.find();

      // Return the authors
      res.json(authors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getSingleAuthor: async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (id.length !== 24 || !(await Authors.exists({ _id: id })))
        return res.status(400).json({ message: "Unable to verify the ID" });

      // Find the author by id
      const author = await Authors.findById(id);

      // Return the Authors
      res.json(author);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addAuthor: async (req, res) => {
    try {
      // Extract Name, age, and gender from the body
      const { name, age, isFemale } = req.body;

      // Validate the arguments
      if (typeof isFemale !== "boolean" || !name || !age)
        return res.status(400).json({
          message:
            "Cannot validate the provided fields. Please remember to provide a valid name, age, and gender.",
        });

      // Create a new entry
      const newAuthor = new Authors({ name, age, isFemale });
      // Save the author
      await newAuthor.save();

      // Return the success message
      res.json({ message: "New Author added successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  editAuthor: async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (id.length !== 24 || !(await Authors.exists({ _id: id })))
        return res.status(400).json({ message: "Unable to verify the ID" });

      // Find the author by id
      await Authors.findByIdAndUpdate(id, { $set: req.body });

      // Return the Authors
      res.json({ message: "Edited the author" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteAuthor: async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (id.length !== 24 || !(await Authors.exists({ _id: id })))
        return res.status(400).json({ message: "Unable to verify the ID" });

      // Find the author by id
      const author = await Authors.findByIdAndDelete(id);

      // Return the Authors
      res.json({ message: "Deleted the author" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = authorController;
