const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GamePlayersModeModel extends Model {}

GamePlayersModeModel.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    players_mode_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "players_modes", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "game_players_modes",
  }
);

module.exports = GamePlayersModeModel;
