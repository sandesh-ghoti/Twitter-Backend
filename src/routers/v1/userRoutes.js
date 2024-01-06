const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
// authentification
router.post("/", UserMiddleware.validateUserSignUpReq, UserController.signup);
router.get(
  "/signin",
  UserMiddleware.validateUserSignInReq,
  UserController.signin
);
router.get(
  "/refreshAccessToken",
  UserMiddleware.refreshTokenCheck,
  UserController.refreshAccessToken
);
router.get("/signout", UserController.signout);
// user
router.put("/updateDetails", UserController.updateDetails);
//follow and unfollow
router.put("/updateFollowing", UserController.updateFollowing);
module.exports = router;
