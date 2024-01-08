const { CommentRepository, TweetRepository } = require("../repositories");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();
async function create(data) {
  try {
    let parent;
    if (data.onModel === "Tweet") {
      parent = await tweetRepository.get(data.commentedOn);
    } else {
      parent = await commentRepository.get(data.commentedOn);
    }
    if (!parent) {
      throw new AppError(
        [`parent ${data.onModel} not found`],
        StatusCodes.BAD_REQUEST
      );
    }
    const comment = await commentRepository.create(data);
    parent.comments.push(comment._id);
    await parent.save();
    return comment;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function update(id, data) {
  try {
    const comment = await commentRepository.get(id);
    if (comment.userId !== data.userId) {
      throw new AppError(
        ["you are not owner of source"],
        StatusCodes.BAD_REQUEST
      );
    }
    const result = await commentRepository.update(id, data.content);
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
    const result = await commentRepository.get(id);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  create,
  update,
  get,
};
