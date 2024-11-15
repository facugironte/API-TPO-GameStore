const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  GameModel,
  PaymentMethodModel,
  SecurityQuestionModel,
  WishlistModel,
  LanguageModel,
  CommentModel,
} = require("../database/models/associations");

const getUserProfile = (req, res) => {
  const { email } = req.params;
  console.log(email);

  UserModel.findOne({
    where: { email },
    include: [
      {
        model: PaymentMethodModel,
        as: "payment_methods", // Asegúrate de que el alias coincida con lo que definiste en el modelo
      },
      {
        model: GameModel,
        as: "wishlists",
      },
      {
        model: GameModel,
        as: "purchased_games",
      },
      {
        model: SecurityQuestionModel,
        as: "security_questions",
      },
      {
        model: GameModel,
        as: "company_games",
      },
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      } else {
        res.status(StatusCodes.OK).json(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Error finding user` });
    });
};

const updateUserProfile = (req, res) => {
  console.log("Solicitud recibida para actualizar perfil:", req.params.email);
  const { email } = req.params;
  const data = req.body;

  UserModel.findOne({
    where: { email },
    include: [
      {
        model: PaymentMethodModel,
        as: "payment_methods", // Asegúrate de que el alias coincida con lo que definiste en el modelo
      },
      {
        model: GameModel,
        as: "wishlists",
      },
      {
        model: GameModel,
        as: "purchased_games",
      },
      {
        model: SecurityQuestionModel,
        as: "security_questions",
      },
      {
        model: GameModel,
        as: "company_games",
      },
    ],
  }) // Primero, busca el usuario por ID
    .then((user) => {
      // Si el usuario existe, actualiza sus datos
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      } else {
        user
          .update(data)
          .then((updatedUser) => {
            // Si el usuario se actualizó correctamente, responde con el usuario actualizado
            res.status(StatusCodes.OK).json(updatedUser);
          })
          .catch((error) => {
            // Si hubo un error al actualizar el usuario, responde con el error
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: error.message });
          });
      }
    })
    .catch((error) => {
      // Si hubo un error al buscar el usuario, responde con el error
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    });
};

const getUserWishlist = (req, res) => {
  const { email } = req.params;

  UserModel.findOne({
    where: { email },
    include: [
      {
        model: GameModel,
        as: "wishlists",
      },
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      } else {
        res.status(StatusCodes.OK).json(user.wishlists);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Error finding user` });
    });
};

const addToWishlist = async (req, res) => {
  const { email, game_id } = req.params;

  const user = await UserModel.findOne({
    where: { email },
    include: [
      {
        model: GameModel,
        as: "wishlists",
      },
    ],
  });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
  } else {
    const game = await GameModel.findByPk(game_id);
    if (game) {
      const wishlist = await WishlistModel.create({
        game_id,
        user_id: user.id,
      });
      game.update({
        addToWishlist: game.addToWishlist + 1,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ message: "Game added to wishlist", game: game });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Game not found" });
    }
  }
};

const deleteFromWishlist = (req, res) => {
  const { email, game_id } = req.params;

  UserModel.findOne({
    where: { email },
    include: [
      {
        model: GameModel,
        as: "wishlists",
      },
    ],
  })
    .then((user) => {
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
      } else {
        WishlistModel.destroy({
          where: {
            game_id,
            user_id: user.id,
          },
        })
          .then((wishlist) => {
            if (wishlist === 1) {
              res
                .status(StatusCodes.OK)
                .json({ message: "Game removed from wishlist" });
            } else {
              res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Game not found in wishlist" });
            }
          })
          .catch((error) => {
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ error: "Error removing game from wishlist" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `Error finding user` });
    });
};

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
      name: data.name,
      user_id: user.id,
    });
    res.status(StatusCodes.CREATED).json(paymentMethod);
  }
};

const userController = {
  getUserProfile,
  updateUserProfile,
  getUserWishlist,
  addToWishlist,
  deleteFromWishlist,
  postPaymentMethod,
};

module.exports = userController;
