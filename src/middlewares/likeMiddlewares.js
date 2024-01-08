const { ModelName } = require("../utils/common");
const { Tweet, Comment } = ModelName;
function likeUnlikeMiddleware(req, res, next) {
  if (!req.body.user.id || !req.body.onModel || !req.body.likedOn) {
    ErrorResponse.message = "Something went wrong while like unlike";
    ErrorResponse.error = `${!req.body.onModel ? "onModel " : ""}${
      !req.body.likedOn ? "likedOn " : ""
    }${
      !req.body.user.id ? "userid " : ""
    }not found in the request in the correct form`;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (
    !req.body.onModel.toLowerCase() == Tweet.toLowerCase() &&
    !req.body.onModel.toLowerCase() == Comment.toLowerCase()
  ) {
    ErrorResponse.message = "Something went wrong while create like unlike";
    ErrorResponse.error = `req.body.onModel not valid, only ${Tweet} and ${Comment} allowed`;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (req.body.onModel.toLowerCase() == Tweet.toLowerCase()) {
    req.body.onModel = Tweet;
  } else {
    req.body.onModel = Comment;
  }
  next();
}

module.exports = { likeUnlikeMiddleware };
