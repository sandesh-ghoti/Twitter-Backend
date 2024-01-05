const CrudRepository = require("./crudRepository");
const { Tweet } = require("../models");
class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  async getWithItsCommentsAndCommentator(id) {
    const res = await Tweet.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "email avatar name",
        },
      })
      .lean();
  }
  async getAllRelatedTweet(data = {}, offset, limit) {
    const res = await Tweet.find(data).skip(offset).limit(limit);
    return res;
  }
  async getAllLikeUser(id) {
    const res = await Tweet.findById(id).populate({
      path: "likes",
      populate: {
        path: "userId",
        select: "name email avatar",
      },
    });
    return res;
  }
}
module.exports = TweetRepository;
