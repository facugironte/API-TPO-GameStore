const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class SecurityQuestionModel extends Model {}
SecurityQuestionModel.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "security_question",
    timestamps: false,
  }
);

module.exports = SecurityQuestionModel;
