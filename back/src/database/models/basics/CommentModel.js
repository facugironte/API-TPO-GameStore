const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class CommentModel extends Model {}
CommentModel.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);

module.exports = CommentModel;
