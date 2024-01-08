const express = require("express");
const router = express.Router();
const { LikeControllers } = require("../../controllers");
const { LikeMiddleware } = require("../../middlewares");

//like
router.post(
  "/",
  LikeMiddleware.likeUnlikeMiddleware,
  LikeControllers.likeUnlike
);
// get all like from object of Tweet or Comment
router.get(
  "/",
  LikeMiddleware.likeUnlikeMiddleware,
  LikeControllers.getAllLikeOfObject
);
module.exports = router;
