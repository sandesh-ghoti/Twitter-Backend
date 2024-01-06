const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");
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
module.exports = router;
