const { LikeService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

async function likeUnlike(req, res) {
  try {
    const result = await LikeService.likeUnlike({
      userId: req.body.user.id,
      onModel: req.body.onModel,
      likedOn: req.body.likedOn,
    });
    SuccessResponse.data = result;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(
      error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllLikeOfObject(req, res) {
  try {
    const result = await LikeService.getAllLikeOfObject({
      onModel: req.body.onModel,
      likedOn: req.body.likedOn,
    });
    SuccessResponse.data = result;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(
      error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { likeUnlike, getAllLikeOfObject };
