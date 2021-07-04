const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  isFemale: {
    type: Boolean,
  }
})

module.exports = mongoose.model("Authors", AuthorSchema)