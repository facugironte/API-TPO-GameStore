const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GameModel extends Model {}
GameModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    cover_url: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
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
      defaultValue: 0,
    },
    sales: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    visualizations: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    addToWishlist: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    salesOverViews: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "games",
  }
);

module.exports = GameModel;
