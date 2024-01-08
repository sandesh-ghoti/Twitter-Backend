const {
  CommentRepository,
  TweetRepository,
  LikeRepository,
} = require("../repositories");
const { Tweet, Comment } = require("../utils/common/modelName");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();
const likeRepository = new LikeRepository();

async function likeUnlike(data) {
  try {
    let likeOnComment = await likeRepository.findByUserAndLikedOn(data);
    if (!likeOnComment) {
      //like
      const like = await likeRepository.create(data);
      console.log("at service ", like);
      if (data.onModel == Tweet) {
        let parent = await tweetRepository.get(data.likedOn);
        parent.likes.push(like._id);
        await parent.save();
      }
      return "liked";
    } else {
      //unlike
      if (data.onModel == Tweet) {
        let parent = await tweetRepository.get(data.likedOn);
        let idx = parent.likes.indexOf(likeOnComment._id);
        parent.likes.splice(idx, 1);
        await parent.save();
      } else {
        //we don't have likes in comment model
      }
      await likeRepository.destroy(likeOnComment._id);
      return "unliked";
    }
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllLikeOfObject(data) {
  try {
    const likes = await likeRepository.getAllLikeOfObject(data);
    return likes;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = { likeUnlike, getAllLikeOfObject };
