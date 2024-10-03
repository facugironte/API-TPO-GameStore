const sequelize = require("../db");
const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {}
UserModel.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.ENUM("USUARIO", "EMPRESA"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["USUARIO", "EMPRESA"]],
          msg: "Invalid account type. Must be 'USUARIO' or 'EMPRESA'.",
        },
      },
    },
    CUIT: {
      type: DataTypes.STRING,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    company_description: {
      type: DataTypes.STRING,
    },
    user_fullname: {
      type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.DATE,
    },
    security_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    security_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = UserModel;
