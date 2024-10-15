const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class PlayersModeModel extends Model {}
PlayersModeModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "players_modes",
    timestamps: false,
  }
);

module.exports = PlayersModeModel;
