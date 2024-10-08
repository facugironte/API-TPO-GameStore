const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class LanguageModel extends Model {}
LanguageModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "languages",
    timestamps: false,
  }
);

module.exports = LanguageModel;
