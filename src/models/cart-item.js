const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = CartItem;
