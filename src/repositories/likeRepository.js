const CrudRepository = require("./crudRepository");
const { Like } = require("../models");
class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }
  async findByUserAndLikedOn(data) {
    const res = await Like.findOne(data);
    return res;
  }
}
module.exports = LikeRepository;
