const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class PaymentMethodModel extends Model {}

PaymentMethodModel.init(
  {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "payment_methods",
  }
);

module.exports = PaymentMethodModel;
