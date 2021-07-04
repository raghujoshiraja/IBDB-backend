const router = require('express').Router()
const bookController = require('../controllers/bookController')

router.route('/')
  .get(bookController.getBooks)
  .post(bookController.addBook)

router.route('/single/:id')
  .get(bookController.getBook)

module.exports = router