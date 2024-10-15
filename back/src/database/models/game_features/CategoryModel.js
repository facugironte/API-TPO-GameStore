const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class CategoryModel extends Model {}
CategoryModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "categories",
    timestamps: false,
  }
);

module.exports = CategoryModel;
