const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class SoModel extends Model {}
SoModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "sos",
    timestamps: false,
  }
);

module.exports = SoModel;
