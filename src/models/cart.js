const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});

module.exports = Cart;
