const { Sequelize } = require("sequelize");

const {
  dbUserPassword: password,
  dbUserName: username,
  dbName,
  dbHost: host,
} = require("./server");

const sequelize = new Sequelize(dbName, username, password, {
  dialect: "mysql",
  host: host,
});

sequelize
  .authenticate()
  .then(() => console.log("Database Connected Successfully!"))
  .catch((err) => console.log("Database Connection Failed!", err));

module.exports = sequelize;
