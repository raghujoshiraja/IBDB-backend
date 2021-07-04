const router = require("express").Router();
const authorController = require("../controllers/authorController");

router
  .route("/")
  .get(authorController.getAuthors)
  .post(authorController.addAuthor);

router
  .route("/single/:id")
  .get(authorController.getSingleAuthor)
  .patch(authorController.editAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;
