const { TweetService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

async function create(req, res) {
  try {
    const data = {
      userId: req.body.user.id,
      content: req.body.content,
    };
    if (req.body.image) data.image = req.body.image;
    const result = await TweetService.create(data);
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
async function update(req, res) {
  try {
    const data = {
      userId: req.body.user.id,
      content: req.body.content,
    };
    if (req.body.image) data.image = req.body.image;
    const result = await TweetService.update(req.params.id, data);
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
async function get(req, res) {
  try {
    const result = await TweetService.get(req.params.id);
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
async function destroy(req, res) {
  try {
    const result = await TweetService.destroy(req.params.id);
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
module.exports = { create, update, get, destroy };
