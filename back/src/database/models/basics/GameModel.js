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
    state: DataTypes.STRING,

    minCpu: DataTypes.STRING,
    minGpu: DataTypes.STRING,
    minRam: DataTypes.STRING,
    minStorage: DataTypes.STRING,
    minSound: DataTypes.STRING,
    optCpu: DataTypes.STRING,
    optGpu: DataTypes.STRING,
    optRam: DataTypes.STRING,
    optStorage: DataTypes.STRING,
    optSound: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "games",
  }
);

module.exports = GameModel;
