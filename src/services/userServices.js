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
async function destroy(id, data) {
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
  destroy,
};
