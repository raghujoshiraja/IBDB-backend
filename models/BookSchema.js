const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  genre: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Books", BookSchema)