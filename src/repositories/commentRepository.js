const CrudRepository = require("./crudRepository");
const { Comment } = require("../models");
class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
  async get(id) {
    const comments = await Comment.findById(id)
      .populate({
        path: "comments",
      })
      .populate({
        path: "userId",
        select: "name avatar email",
      });
    return comments;
  }
}
module.exports = CommentRepository;
