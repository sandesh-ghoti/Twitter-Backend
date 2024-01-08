const { CommentService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

async function create(req, res) {
  try {
    const result = await CommentService.create({
      userId: req.body.user.id,
      content: req.body.content,
      onModel: req.body.onModel,
      commentedOn: req.body.commentedOn,
    });
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
async function update(req, res) {
  try {
    const result = await CommentService.update(req.params.id, {
      userId: req.body.user.id,
      content: req.body.content,
    });
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
    const result = await CommentService.get(req.params.id);
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
module.exports = { create, update, get };
