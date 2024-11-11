const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class CommentModel extends Model {}
CommentModel.init(
  {
    email_user: {
      type: DataTypes.STRING,
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
