const mongoose = require("mongoose");
const hashtagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

hashtagSchema.index({ title: 1 });
const hashtag = mongoose.model("Hashtag", hashtagSchema);
module.exports = hashtag;
