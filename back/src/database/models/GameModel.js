const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class GameModel extends Model {}
GameModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "game",
  }
);

module.exports = GameModel;
