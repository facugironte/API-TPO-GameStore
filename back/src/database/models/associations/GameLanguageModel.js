const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GameLanguageModel extends Model {}

GameLanguageModel.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "languages", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "game_language",
    timestamps: false,
  }
);

module.exports = GameLanguageModel;
