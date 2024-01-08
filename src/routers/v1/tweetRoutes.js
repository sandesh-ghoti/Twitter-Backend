const express = require("express");
const router = express.Router();
const { TweetMiddleware } = require("../../middlewares");
const { TweetControllers } = require("../../controllers");
// create
router.post("/", TweetMiddleware.createMiddleware, TweetControllers.create);
// update only owner can update post
router.put("/:id", TweetMiddleware.updateMiddleware, TweetControllers.update);
// delete only owner can update post and also delete all its comments and likes
router.delete("/:id", TweetMiddleware.getMiddleware, TweetControllers.destroy);
// get also populate comments
router.get("/:id", TweetMiddleware.getMiddleware, TweetControllers.get);

module.exports = router;
