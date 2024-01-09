const CrudRepository = require("./crudRepository");
const { Hashtag } = require("../models");
class HashtagRepository extends CrudRepository {
  constructor() {
    super(Hashtag);
  }
  async insertMany(data) {
    const res = await Hashtag.insertMany(data);
    return res;
  }
  async findByName(titleList) {
    const res = await Hashtag.find({ title: titleList });
    return res;
  }
  async findOneByName(title) {
    const res = await Hashtag.findOne({ title: title }).populate({
      path: "tweets",
      populate: {
        path: "userId",
        select: "name email avatar",
      },
    });
    return res;
  }
  async trendingHashtags(offset = 0, limit = 10) {
    // this is not proper logic to get trending hashtags -> now we use point 2 only
    /**what should be logic?
     * 1. highest tweets in tags in last hour or one day as we wanted -> 60%
     * 2. highest tweets in tags till now -> 40%
     * 3. we can create new Model and find trending tags using cron job
     */
    const res = await Hashtag.aggregate()
      .addFields({
        length: { $size: "$tweets" },
      })
      .sort({ length: "desc" })
      .skip(offset)
      .limit(limit);
    return res;
  }
}
module.exports = HashtagRepository;
