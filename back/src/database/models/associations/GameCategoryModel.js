const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GameCategoryModel extends Model {}

GameCategoryModel.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "game_categories",
    timestamps: false,
  }
);

module.exports = GameCategoryModel;
