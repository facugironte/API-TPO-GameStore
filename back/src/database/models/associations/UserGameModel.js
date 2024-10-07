const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class UserGameModel extends Model {}

UserGameModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user_games",
  }
);

module.exports = UserGameModel;
