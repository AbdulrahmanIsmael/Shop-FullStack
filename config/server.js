require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  dbUserPassword: process.env.DB_USER_PASSWORD,
  dbUserName: process.env.DB_USER_NAME,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
};
