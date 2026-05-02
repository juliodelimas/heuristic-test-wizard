const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/heuristic_test_wizard",
  jwtSecret: process.env.JWT_SECRET || "change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
};
