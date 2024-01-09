const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse, Auth } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
async function signup(req, res) {
  try {
    const result = await UserService.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = result;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}
async function signin(req, res) {
  try {
    const result = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    const refreshToken = result.refreshToken;
    delete result.refreshToken;
    SuccessResponse.data = result;
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}
async function signout(req, res) {
  try {
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    SuccessResponse.data = "logout successfully";
    return res.status(StatusCodes.OK).send(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error.name;
    return res.status(StatusCodes.NOT_MODIFIED).send(ErrorResponse);
  }
}
async function refreshAccessToken(req, res) {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    let accessToken = await Auth.refreshAccessToken(refreshToken);
    SuccessResponse.data = { accessToken };
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}
async function updateDetails(req, res) {
  try {
    // update name, bio, avatar
    const data = {};
    if (req.body.name) data.name = req.body.name;
    if (req.body.bio) data.bio = req.body.bio;
    if (req.body.avatar && req.body.avatar.url) data.avatar = req.body.avatar;
    const result = await UserService.update(req.body.user.id, data);
    SuccessResponse.data = result;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}
async function updateFollowing(req, res) {
  try {
    const result = await UserService.updateFollowing(
      req.body.user.id,
      req.body.userId
    );
    SuccessResponse.data = result;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res
      .status(
        error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(ErrorResponse);
  }
}
module.exports = {
  signup,
  signin,
  signout,
  refreshAccessToken,
  updateDetails,
  updateFollowing,
};
