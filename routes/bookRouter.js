const router = require("express").Router();
const bookController = require("../controllers/bookController");

router.route("/").get(bookController.getBooks).post(bookController.addBook);

router
  .route("/single/:id")
  .get(bookController.getSingleBook)
  .patch(bookController.editSingleBook)
  .delete(bookController.deleteSingleBook);

module.exports = router;
