const CrudRepository = require("./crudRepository");
const { Like } = require("../models");
class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }
  async findByUserAndLikedOn(data) {
    const result = await Like.findOne({
      userId: data.userId,
      onModel: data.onModel,
      likedOn: data.likedOn,
    });
    return result;
  }
  async getAllLikeOfObject(data) {
    const result = await Like.find(data);
    return result;
  }
}
module.exports = LikeRepository;
