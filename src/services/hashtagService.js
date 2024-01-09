const { HashtagRepository } = require("../repositories");
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
const hashtagRepository = new HashtagRepository();
async function get(id) {
  try {
    const result = await hashtagRepository.get(id);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getTagsTweets(title) {
  try {
    const result = await hashtagRepository.findOneByName(title);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function trendingHashtags(offset, limit) {
  try {
    const result = await hashtagRepository.trendingHashtags(offset, limit);
    return result;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  get,
  getTagsTweets,
  trendingHashtags,
};
