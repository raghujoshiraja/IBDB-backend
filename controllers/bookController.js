const Books = require('../models/BookSchema')
const Authors = require('../models/AuthorSchema')

const bookController = {
  getBooks: async (req, res) => {
    try {
      let allBooks = await Books.find()

      const response = allBooks.map(async (book) => (await {...book, authorId: null, author: Authors.findById(book.authorId) }))
      res.json(response)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getBook: async (req, res) => {
    try {
      
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  addBook: async (req, res) => {
    try {
      const { title, genre, pageCount, authorId, description } = req.body

      const newBook = new Books({
        title, genre, pageCount, authorId, description
      })
      newBook.save()

      res.json({message: "New book saved"})
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = bookController