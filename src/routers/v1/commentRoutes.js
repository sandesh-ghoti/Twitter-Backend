const express = require("express");
const router = express.Router();
const { CommentControllers } = require("../../controllers");
const { CommentMiddleware } = require("../../middlewares");
// create comment
router.post("/", CommentMiddleware.createMiddleware, CommentControllers.create);
// update comment
router.put(
  "/:id",
  CommentMiddleware.updateMiddleware,
  CommentControllers.update
);
// get comment
router.get("/:id", CommentMiddleware.getMiddleware, CommentControllers.get);

module.exports = router;
