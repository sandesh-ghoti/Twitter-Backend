const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");

async function createMiddleware(req, res, next) {
  if (!req.body.content || !req.body.onModel || !req.body.commentedOn) {
    ErrorResponse.message = "Something went wrong while create comment";
    ErrorResponse.error = new AppError(
      [
        `${!req.body.content ? "content " : ""}${
          !req.body.onModel ? "onModel " : ""
        }${
          !req.body.commentedOn ? "commentedOn " : ""
        }not found in the request in the correct form`,
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function updateMiddleware(req, res, next) {
  if (!req.body.content || !req.params.id) {
    ErrorResponse.message = "Something went wrong while update comment";
    ErrorResponse.error = new AppError(
      [
        `${!req.body.content ? "content " : ""}${
          !req.params.id ? "commentId in params " : ""
        }not found in the request in the correct form`,
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function getMiddleware(req, res, next) {
  if (!req.params.id) {
    ErrorResponse.message = "Something went wrong while getting comment";
    ErrorResponse.error = new AppError(
      [
        `${
          !req.params.id ? "commentId in params " : ""
        }not found in the request in the correct form`,
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  createMiddleware,
  updateMiddleware,
  getMiddleware,
};
