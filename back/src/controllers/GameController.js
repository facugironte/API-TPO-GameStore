const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  GameModel,
  UserGameModel,
} = require("../database/models/associations");

const postGame = (req, res) => {
  const data = req.body;
  GameModel.create({
    name: data.name,
    category: data.category,
  })
    .then((game) => {
      res.status(StatusCodes.CREATED).json(game);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: `Error creating game: ${err}` });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: `Error creating game: ${err}` });
      }
    });
};

const updateGame = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  GameModel.findByPk(id) // Primero, busca el usuario por ID
    .then((game) => {
      // Si el usuario existe, actualiza sus datos
      if (!game) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Game not found" });
      } else {
        game
          .update(data)
          .then((updatedGame) => {
            // Si el usuario se actualizó correctamente, responde con el usuario actualizado
            res.status(StatusCodes.OK).json(updatedGame);
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

const getGame = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const games = await GameModel.findAll();
    res.status(StatusCodes.OK).json(games);
  } else {
    const game = await GameModel.findByPk(id);
    if (game) {
      res.status(StatusCodes.OK).json(game);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Game not found" });
    }
  }
};

const deleteGame = (req, res) => {
  const { id } = req.params;

  GameModel.findByPk(id) // Primero, busca el usuario por ID
    .then((game) => {
      if (!game) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Game not found" });
      } else {
        GameModel.destroy({ where: { id: id } }).then(() => {
          res
            .status(StatusCodes.OK)
            .json({ message: "Game deleted successfully", game });
        });
      }
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    });
};

const buyGame = async (req, res) => {
  const { id_user, id_game } = req.params;
  const user = await UserModel.findByPk(id_user);
  const game = await GameModel.findByPk(id_game);
  try {
    if (!user || !game) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User or game not found" });
    } else {
      await UserGameModel.create({
        user_id: id_user,
        game_id: id_game,
      });
      res.status(StatusCodes.OK).json({ message: "Game bought successfully" });
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `Game not bought: ${err}` });
  }
};

const gameController = {
  getGame,
  postGame,
  updateGame,
  deleteGame,
  buyGame,
};

module.exports = gameController;
