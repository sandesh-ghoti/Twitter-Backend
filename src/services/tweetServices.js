const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const { TweetRepository, CommentRepository } = require("../repositories");
const tweetRepository = new TweetRepository();
const commentRepository = new CommentRepository();
async function create(data) {
  try {
    const result = await tweetRepository.create(data);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function update(id, data) {
  try {
    const tweet = await tweetRepository.get(id);
    if (tweet.userId !== data.userId) {
      throw new AppError(
        ["you are not owner of source"],
        StatusCodes.BAD_REQUEST
      );
    }
    const result = await tweetRepository.update(id, data);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function get(id) {
  try {
    const result = await tweetRepository.get(id);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroy(id) {
  try {
    const result = await tweetRepository.get(id);
    // delete comment of comments
    await getAllCommentsAndDelete(result.comments);
    // TODO: all like should be unlike of Tweet
    await tweetRepository.destroy(id);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAllCommentsAndDelete(comments) {
  if (comments.length === 0) {
    return;
  }
  await comments.forEach(async (commentId) => {
    const comment = await commentRepository.get(commentId);
    await getAllCommentsAndDelete(comment.comments);
    await commentRepository.destroy(commentId);
    // TODO: also delete unlike comment
    return;
  });
}
module.exports = {
  create,
  update,
  destroy,
  get,
};
