const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const {
  TweetRepository,
  CommentRepository,
  HashtagRepository,
} = require("../repositories");
const tweetRepository = new TweetRepository();
const commentRepository = new CommentRepository();
const hashtagRepository = new HashtagRepository();
async function create(data) {
  try {
    const result = await tweetRepository.create(data);
    // find all hashtag from content and query from db and create new one for new one and append new tweet id init
    const regex = new RegExp(/#\w+/, "g");
    const tags = data.content
      .match(regex)
      .map((tag) => tag.substring(1).toLowerCase());
    // find exist and notExist tags
    const exists = await hashtagRepository.findByName(tags);
    const existsTitle = exists.map((tag) => tag.title);
    let notExists = tags.filter((tag) => !existsTitle.includes(tag));
    //create new tags for notExist tags
    notExists = notExists.map((tag) => {
      return { title: tag, tweets: [result._id] };
    });
    await hashtagRepository.insertMany(notExists);
    // insert tweet id in exists tags
    await exists.forEach(async (tag) => {
      await tag.tweets.push(result._id);
      await tag.save();
    });
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
