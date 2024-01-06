const mongoose = require("mongoose");
const { Auth } = require("../utils/common/");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
      maxlength: 128,
    },
    bio: {
      type: String,
    },
    avatar: {
      publicId: String,
      url: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function save(next) {
  const user = this;
  const password = await Auth.hashPassword(user.password);
  user.password = password;
  next();
});
userSchema.methods.comparePassword = async (password) => {
  const check = await Auth.comparePassword(password, this.password);
  return check;
};
userSchema.methods.generateAccessToken = () => {
  return Auth.generateAccessToken({ id: this._id, email: this.email });
};
userSchema.methods.generateRefreshToken = () => {
  return Auth.generateRefreshToken({ id: this._id, email: this.email });
};
const user = mongoose.model("User", userSchema);
module.exports = user;
