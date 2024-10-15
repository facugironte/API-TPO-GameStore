const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class GameSoModel extends Model {}

GameSoModel.init(
  {
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    so_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sos", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "game_sos",
    timestamps: false,
  }
);

module.exports = GameSoModel;
