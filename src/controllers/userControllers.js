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
async function update(req, res) {
  try {
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
module.exports = { signup, signin, refreshAccessToken, update };
