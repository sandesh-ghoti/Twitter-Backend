const express = require("express");
const router = express.Router();
const { HashtagMiddleware } = require("../../middlewares");
const { HashtagControllers } = require("../../controllers");

router.get(
  "/tag",
  HashtagMiddleware.getByNameMiddleware,

  HashtagControllers.getTagsTweets
);
router.get("/top", HashtagControllers.getTopHashTags);
router.get("/:id", HashtagMiddleware.getMiddleware, HashtagControllers.get);
module.exports = router;
