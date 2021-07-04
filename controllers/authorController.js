const Authors = require('../models/AuthorSchema')

const authorController = {
  getAuthors: async (req, res) => {
    try {
      const authors = await Authors.find()

      res.json(authors)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getSingleAuthor: async (req, res) => {
    try {
      const authors = await Authors.find()

      res.json(authors)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  addAuthor: async (req, res) => {
    try {
      const { name, age, isFemale } = req.body

      const newAuthor = new Authors({ name, age, isFemale })
      await newAuthor.save()

      res.json({ message: "New Author added successfully" })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = authorController