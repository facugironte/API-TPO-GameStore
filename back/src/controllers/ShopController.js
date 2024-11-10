const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  GameModel,
  UserGameModel,
  PaymentMethodModel,
} = require("../database/models/associations");

const postPaymentMethod = async (req, res) => {
  const { email } = req.params;
  const data = req.body;

  const user = await UserModel.findOne({
    where: { email },
  });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
  } else {
    const paymentMethod = await PaymentMethodModel.create({
      number: data.number,
      name: data.alias,
      expiration_date: data.expiration_date,
      cvc: data.cvc,
      user_id: user.id,
    });
    res.status(StatusCodes.CREATED).json(paymentMethod);
  }
};

const buyGame = async (req, res) => {
  const { email, game_id, payment_method_id } = req.body;
  const user = await UserModel.findOne({
    where: { email },
  });
  const game = await GameModel.findByPk(game_id);
  try {
    if (!user || !game) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User or game not found" });
    } else {
      await UserGameModel.create({
        user_id: user.id,
        game_id: game_id,
        payment_method_id: payment_method_id,
      });

      game.update({
        sales: game.sales + 1,
        salesOverViews: (game.sales + 1) / game.visualizations,
      });

      res.status(StatusCodes.OK).json({ message: "Game bought successfully" });
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Game not bought: ${err}` });
  }
};

const shopController = {
  postPaymentMethod,
  buyGame,
};

module.exports = shopController;
