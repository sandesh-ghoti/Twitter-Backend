const dotenv = require("dotenv");
dotenv.config(__dirname + "../../.env");
module.exports = {
  PORT: process.env.PORT,
  URI: process.env.URI,
  SALT_ROUND: process.env.SALT_ROUND,
  REFRESH_TOKEN_PRIVATE_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_JWT_EXPIRY: process.env.ACCESS_JWT_EXPIRY,
  REFRESH_JWT_EXPIRY: process.env.REFRESH_JWT_EXPIRY,
};
