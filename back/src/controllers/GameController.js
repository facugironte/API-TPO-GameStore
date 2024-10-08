const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  GameModel,
  UserGameModel,
  GameCategoryModel,
  CategoryModel,
  LanguageModel,
  GameLanguageModel,
  PlayersModeModel,
  GamePlayersModeModel,
  SoModel,
  GameSoModel,
} = require("../database/models/associations");

const postGame = async (req, res) => {
  let data = req.body;
  let game;

  try {
    data = {
      ...data,
      state: "CREADO",
    };
    game = await GameModel.create(data);

    if (!game) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Error creating game",
      });
    } else {
      // CATEGORIAS
      if (data.categories) {
        const categoryPromises = data.categories.map(async (category) => {
          const categoryRow = await CategoryModel.findOne({
            where: { name: category },
          });
          if (!categoryRow) {
            throw new Error("Category not found");
          }
          return GameCategoryModel.create({
            game_id: game.id,
            category_id: categoryRow.id,
          });
        });

        // Esperar a que todas las categorías sean creadas
        try {
          await Promise.all(categoryPromises);
        } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Category not found",
          });
          GameModel.destroy({ where: { id: game.id } });
          return;
        }
      }

      // IDIOMAS
      if (data.languages) {
        const languagePromises = data.languages.map(async (language) => {
          const languageRow = await LanguageModel.findOne({
            where: { name: language },
          });
          if (!languageRow) {
            throw new Error("Language not found");
          }
          return GameLanguageModel.create({
            game_id: game.id,
            language_id: languageRow.id,
          });
        });

        // Esperar a que todas los idiomas sean creadas
        try {
          await Promise.all(languagePromises);
        } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Language not found",
          });
          GameModel.destroy({ where: { id: game.id } });
          return;
        }
      }

      // MODOS DE JUEGO
      if (data.players_modes) {
        const pmodesPromises = data.players_modes.map(async (pmode) => {
          const pmodeRow = await PlayersModeModel.findOne({
            where: { name: pmode },
          });
          if (!pmodeRow) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              error: "Error creating game: Players Mode not found",
            });
            return;
          }
          return GamePlayersModeModel.create({
            game_id: game.id,
            players_mode_id: pmodeRow.id,
          });
        });

        // Esperar a que todos los modos sean creados
        try {
          await Promise.all(pmodesPromises);
        } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Players Mode not found",
          });
          GameModel.destroy({ where: { id: game.id } });
          return;
        }
      }

      // SOS
      if (data.sos) {
        const sosPromises = data.sos.map(async (so) => {
          const soRow = await SoModel.findOne({
            where: { name: so },
          });
          if (!soRow) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              error: "Error creating game: So not found",
            });
            return;
          }
          return GameSoModel.create({
            game_id: game.id,
            so_id: soRow.id,
          });
        });

        // Esperar a que todos los sos sean creados
        try {
          await Promise.all(sosPromises);
        } catch (error) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "So not found",
          });
          GameModel.destroy({ where: { id: game.id } });
          return;
        }
      }

      //Para devolver el nuevo juego completo
      const newGame = await GameModel.findByPk(game.id, {
        include: [
          {
            model: CategoryModel,
            as: "categories",
          },
          {
            model: LanguageModel,
            as: "languages",
          },
          {
            model: PlayersModeModel,
            as: "players_modes",
          },
          {
            model: SoModel,
            as: "sos",
          },
        ],
      });

      res.status(StatusCodes.OK).json(newGame);
    }
  } catch (error) {
    console.log(error);
    GameModel.destroy({ where: { id: game.id } });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error creating game",
    });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const game = await await GameModel.findByPk(id, {
    include: [
      {
        model: CategoryModel,
        as: "categories",
      },
      {
        model: LanguageModel,
        as: "languages",
      },
      {
        model: PlayersModeModel,
        as: "players_modes",
      },
      {
        model: SoModel,
        as: "sos",
      },
    ],
  });

  if (!game) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Game not found" });
  } else {
    await game.update(data, { where: { id: id } });

    // Actualiza categorías, languages, players_modes si es necesario
    if (data.categories) {
      // Eliminar las relaciones actuales
      await GameCategoryModel.destroy({ where: { game_id: id } });

      // Crear las nuevas relaciones de categorías
      const categoryPromises = data.categories.map(async (category) => {
        const categoryRow = await CategoryModel.findOne({
          where: { name: category },
        });
        if (!categoryRow) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error updating game categories: Category not found",
          });
        }
        return GameCategoryModel.create({
          game_id: id,
          category_id: categoryRow.id,
        });
      });

      // Esperar a que todas las categorías sean creadas
      await Promise.all(categoryPromises);
    }

    if (data.languages) {
      // Eliminar las relaciones actuales
      await GameLanguageModel.destroy({ where: { game_id: id } });

      // Crear las nuevas relaciones de idiomas
      const languagePromises = data.languages.map(async (language) => {
        const languageRow = await LanguageModel.findOne({
          where: { name: language },
        });
        if (!languageRow) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error updating game languages: Language not found",
          });
        }
        return GameLanguageModel.create({
          game_id: id,
          language_id: languageRow.id,
        });
      });

      // Esperar a que todos los idiomas sean creados
      await Promise.all(languagePromises);
    }

    if (data.players_modes) {
      // Eliminar las relaciones actuales
      await GamePlayersModeModel.destroy({ where: { game_id: id } });

      // Crear las nuevas relaciones de idiomas
      const pmodesPromises = data.players_modes.map(async (pmode) => {
        const pmodeRow = await PlayersModeModel.findOne({
          where: { name: pmode },
        });
        if (!pmodeRow) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error updating game languages: Language not found",
          });
        }
        return GamePlayersModeModel.create({
          game_id: id,
          players_mode_id: pmodeRow.id,
        });
      });

      // Esperar a que todos los idiomas sean creados
      await Promise.all(pmodesPromises);
    }

    if (data.sos) {
      // Eliminar las relaciones actuales
      await GameSoModel.destroy({ where: { game_id: id } });

      // Crear las nuevas relaciones de idiomas
      const sosPromises = data.sos.map(async (so) => {
        const soRow = await SoModel.findOne({
          where: { name: so },
        });
        if (!soRow) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error updating game languages: Language not found",
          });
        }
        return GameSoModel.create({
          game_id: id,
          so_id: soRow.id,
        });
      });

      // Esperar a que todos los sos sean creados
      await Promise.all(sosPromises);
    }

    const updatedGame = await GameModel.findByPk(id, {
      include: [
        {
          model: CategoryModel,
          as: "categories",
        },
        {
          model: LanguageModel,
          as: "languages",
        },
        {
          model: PlayersModeModel,
          as: "players_modes",
        },
        {
          model: SoModel,
          as: "sos",
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(StatusCodes.OK).json(updatedGame);
  }
};

const getGame = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const games = await GameModel.findAll();
    res.status(StatusCodes.OK).json(games);
  } else {
    const game = await GameModel.findByPk(id, {
      include: [
        {
          model: CategoryModel, // Asegúrate de usar CategoryModel
          as: "categories",
        },
        {
          model: LanguageModel, // Esto es aparte
          as: "languages",
        },
        {
          model: PlayersModeModel,
          as: "players_modes",
        },
      ],
    });
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
