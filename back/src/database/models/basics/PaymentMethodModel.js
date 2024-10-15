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
    expiration_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvc: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "payment_methods",
  }
);

module.exports = PaymentMethodModel;
