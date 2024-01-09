const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
async function getByNameMiddleware(req, res, next) {
  if (!req.body.title) {
    ErrorResponse.message = "Something went wrong while getting hashtag";
    ErrorResponse.error = new AppError(
      [
        `${
          !req.body.title ? "title " : ""
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
    ErrorResponse.message = "Something went wrong while getting hashtag";
    ErrorResponse.error = new AppError(
      [
        `${
          !req.params.id ? "hashtag id " : ""
        }not found in the request in the correct form`,
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = { getByNameMiddleware, getMiddleware };
