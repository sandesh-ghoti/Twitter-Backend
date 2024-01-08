const express = require("express");
const router = express.Router();
const likeRoute = require("./likeRoutes");
const commentRoute = require("./commentRoutes");
const hashtagRoute = require("./hashtagRoutes");
const tweetRoute = require("./tweetRoutes");
const userRoute = require("./userRoutes");
const { authentication } = require("../../middlewares/userMiddlewares");

router.use("/like", authentication, likeRoute);
router.use("/comment", authentication, commentRoute);
router.use("/hashtag", authentication, hashtagRoute);
router.use("/tweet", authentication, tweetRoute);
router.use("/user", userRoute);
module.exports = router;
