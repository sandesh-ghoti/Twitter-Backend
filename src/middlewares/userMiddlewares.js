const { UserRepository } = require("../repositories");
const userRepository = new UserRepository();
const { ErrorResponse } = require("../utils/common");
const { validateAccessToken } = require("../utils/common/auth");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");

async function validateUserSignInReq(req, res, next) {
  if (!req.body.email || !req.body.password) {
    ErrorResponse.message = "Something went wrong while signin user";
    ErrorResponse.error = new AppError(
      [
        `${!req.body.email ? "emailId " : ""}${
          !req.body.password ? "password " : ""
        }not found in the request in the correct form`,
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function validateUserSignUpReq(req, res, next) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    ErrorResponse.message = "Something went wrong while signup the user";
    ErrorResponse.error = new AppError(
      [
        `${!name ? "name " : ""}${!req.body.email ? "emailId " : ""}${
          !req.body.password ? "password " : ""
        }not found in the request in the correct form`,
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function refreshTokenCheck(req, res, next) {
  if (!req.cookies.jwt) {
    ErrorResponse.message = "Something went wrong while making request";
    ErrorResponse.error = `refresh access token not found in the request. please login again`;
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
  }
  next();
}
async function authentication(req, res, next) {
  try {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      throw new AppError(
        ["authorization header is required"],
        StatusCodes.BAD_REQUEST
      );
    }
    let accessToken = req.headers.authorization.split(" ")[1];
    //if accesstoken valid
    let id = await validateAccessToken(accessToken);
    // validated user
    let user = await userRepository.get(id);
    if (!user) throw new AppError(["user not found"], StatusCodes.BAD_REQUEST);
    req.body.user = { id: user._id, email: user.email };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      ErrorResponse.error = "at authentification " + error.message;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      name: "at authentification " + error.name,
      message: error.message,
    });
  }
}
module.exports = {
  validateUserSignInReq,
  validateUserSignUpReq,
  authentication,
  refreshTokenCheck,
};
