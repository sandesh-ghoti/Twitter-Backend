const { ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

async function createMiddleware(req, res, next) {
  if (!req.body.content || !req.body.user.id) {
    ErrorResponse.message = "Something went wrong while create comment";
    ErrorResponse.error = `${!req.body.content ? "content " : ""}${
      !req.body.user.id ? "userid " : ""
    }not found in the request in the correct form`;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function updateMiddleware(req, res, next) {
  if (!req.body.content || !req.params.id || !req.body.user.id) {
    ErrorResponse.message = "Something went wrong while update comment";
    ErrorResponse.error = `${!req.body.content ? "content " : ""}${
      !req.params.id ? "commentId in params " : ""
    }${
      !req.body.user.id ? "userid " : ""
    }not found in the request in the correct form`;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function getMiddleware(req, res, next) {
  if (!req.params.id || !req.body.user.id) {
    ErrorResponse.message = "Something went wrong while getting comment";
    ErrorResponse.error = `${!req.params.id ? "commentId in params " : ""}${
      !req.body.user.id ? "userid " : ""
    }not found in the request in the correct form`;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
module.exports = {
  createMiddleware,
  updateMiddleware,
  getMiddleware,
};
