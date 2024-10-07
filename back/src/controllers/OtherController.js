const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  PaymentMethodModel,
} = require("../database/models/associations");

const getUsers = async (req, res) => {
  const users = await UserModel.findAll({
    include: [{ model: PaymentMethodModel, as: "payment_method" }],
  });
  res.status(StatusCodes.OK).json(users);
};

const userController = {
  getUsers,
};

module.exports = userController;
