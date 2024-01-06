const { UserRepository } = require("../repositories");
const userRepository = new UserRepository();
const AppError = require("../utils/errors/appError");
const { StatusCodes } = require("http-status-codes");
async function signup(data) {
  try {
    console.log(data.password);
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    return { user, accessToken, refreshToken };
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function update(id, data) {
  try {
    const user = await userRepository.update(id, data);
    return user;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updateFollowing(id, userId) {
  try {
    // update followings of id and followers of userId
    const user = await userRepository.get(id);
    const userToFollow = await userRepository.get(userId);
    let idx = user.followings.indexOf(userToFollow);
    if (idx > -1) {
      //unfollow
      user.followings.splice(idx, 1);
      idx = userToFollow.followers.indexOf(id);
      userToFollow.followers.splice(idx, 1);
    } else {
      user.followings.push(userId);
      userToFollow.followers.push(id);
    }
    await user.save();
    await userToFollow.save();
    return user;
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroy(id) {
  try {
    const user = await userRepository.destroy(id);
    return "Success";
  } catch (error) {
    throw new AppError(
      error.name + " " + error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  signup,
  signin,
  update,
  updateFollowing,
  destroy,
};
