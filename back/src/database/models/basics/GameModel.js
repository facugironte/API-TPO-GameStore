const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GameModel extends Model {}
GameModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: DataTypes.STRING,
    so: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "games",
  }
);

module.exports = GameModel;
