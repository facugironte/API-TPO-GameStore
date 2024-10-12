const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GameModel extends Model {}
GameModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_url: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
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

    company: DataTypes.STRING,
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: -1,
    },
    sales: DataTypes.INTEGER,
    visualizations: DataTypes.INTEGER,
    addToWishlist: DataTypes.INTEGER,
    salesOverViews: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "games",
  }
);

module.exports = GameModel;
