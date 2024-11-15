const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
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
  CommentModel,
} = require("../database/models/associations");

const getGame = async (req, res) => {
  const { id } = req.params;
  const { count_stat } = req.query;

  const {
    order,
    direction,
    limit,
    name,
    state,
    language,
    category,
    players_mode,
    os,
    minPrice,
    maxPrice,
    rating,
  } = req.query;

  const orderCondition = order ? [[order, direction]] : undefined;
  const limitCondition = limit ? parseInt(limit) : undefined;

  const whereCondition = {};

  if (state) {
    whereCondition.state = state;
  }

  if (minPrice || maxPrice) {
    whereCondition.price = {};
    if (minPrice) {
      whereCondition.price[Op.gte] = parseFloat(minPrice); // Usa Op.gte para el precio mínimo
    }
    if (maxPrice) {
      whereCondition.price[Op.lte] = parseFloat(maxPrice); // Usa Op.lte para el precio máximo
    }
  }

  if (rating) {
    whereCondition.rating = {};
    whereCondition.rating[Op.gte] = parseFloat(rating);
  }

  if (name) {
    whereCondition.name = { [Op.like]: `%${name}%` };
  }

  if (!id) {
    const games = await GameModel.findAll({
      order: orderCondition,
      limit: limitCondition,
      where: whereCondition,
      include: [
        {
          model: CategoryModel,
          as: "categories",
          where: category ? { name: category } : undefined,
        },
        {
          model: LanguageModel,
          as: "languages",
          where: language ? { name: language } : undefined,
        },
        {
          model: PlayersModeModel,
          as: "players_modes",
          where: players_mode ? { name: players_mode } : undefined,
        },
        {
          model: SoModel,
          as: "sos",
          where: os ? { name: os } : undefined,
        },
        {
          model: UserModel,
          as: "company_owner",
        },
        {
          model: CommentModel,
          as: "comments",
        },
      ],
    });
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
        {
          model: SoModel,
          as: "sos",
        },
        {
          model: UserModel,
          as: "company_owner",
        },
        {
          model: CommentModel,
          as: "comments",
        },
      ],
    });
    if (count_stat) {
      game.update({
        visualizations: game.visualizations + 1,
        salesOverViews: game.sales / (game.visualizations + 1),
      });
    }
    if (game) {
      res.status(StatusCodes.OK).json(game);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Game not found" });
    }
  }
};

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
    if (game) {
      GameModel.destroy({ where: { id: game.id } });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error creating game",
    });
  }
};

const updateGame = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    // Buscar el juego por ID, incluyendo las relaciones necesarias
    const game = await GameModel.findByPk(id, {
      include: [
        { model: CategoryModel, as: "categories" },
        { model: LanguageModel, as: "languages" },
        { model: PlayersModeModel, as: "players_modes" },
        { model: SoModel, as: "sos" },
      ],
    });

    // Si no se encuentra el juego, devolver un error
    if (!game) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Game not found" });
    }

    // Actualizar los datos principales del juego
    await game.update(data);

    // Actualizar las relaciones (categories, languages, players_modes, sos)

    // ACTUALIZAR categorías
    if (data.categories) {
      // Eliminar las relaciones actuales
      await GameCategoryModel.destroy({ where: { game_id: id } });

      // Crear nuevas relaciones de categorías
      const categoryPromises = data.categories.map(async (category) => {
        const categoryRow = await CategoryModel.findOne({
          where: { name: category },
        });
        if (!categoryRow) {
          throw new Error(`Category '${category}' not found`);
        }
        return GameCategoryModel.create({
          game_id: id,
          category_id: categoryRow.id,
        });
      });

      // Esperar a que todas las categorías sean creadas
      await Promise.all(categoryPromises);
    }

    // ACTUALIZAR idiomas
    if (data.languages) {
      // Eliminar las relaciones actuales
      await GameLanguageModel.destroy({ where: { game_id: id } });

      // Crear nuevas relaciones de idiomas
      const languagePromises = data.languages.map(async (language) => {
        const languageRow = await LanguageModel.findOne({
          where: { name: language },
        });
        if (!languageRow) {
          throw new Error(`Language '${language}' not found`);
        }
        return GameLanguageModel.create({
          game_id: id,
          language_id: languageRow.id,
        });
      });

      // Esperar a que todos los idiomas sean creados
      await Promise.all(languagePromises);
    }

    // ACTUALIZAR modos de juego
    if (data.players_modes) {
      // Eliminar las relaciones actuales
      await GamePlayersModeModel.destroy({ where: { game_id: id } });

      // Crear nuevas relaciones de modos de juego
      const pmodesPromises = data.players_modes.map(async (pmode) => {
        const pmodeRow = await PlayersModeModel.findOne({
          where: { name: pmode },
        });
        if (!pmodeRow) {
          throw new Error(`Players Mode '${pmode}' not found`);
        }
        return GamePlayersModeModel.create({
          game_id: id,
          players_mode_id: pmodeRow.id,
        });
      });

      // Esperar a que todos los modos de juego sean creados
      await Promise.all(pmodesPromises);
    }

    // ACTUALIZAR sistemas operativos (sos)
    if (data.sos) {
      // Eliminar las relaciones actuales
      await GameSoModel.destroy({ where: { game_id: id } });

      // Crear nuevas relaciones de sistemas operativos
      const sosPromises = data.sos.map(async (so) => {
        const soRow = await SoModel.findOne({ where: { name: so } });
        if (!soRow) {
          throw new Error(`Operating System '${so}' not found`);
        }
        return GameSoModel.create({
          game_id: id,
          so_id: soRow.id,
        });
      });

      // Esperar a que todos los sistemas operativos sean creados
      await Promise.all(sosPromises);
    }

    // Obtener el juego actualizado con todas las relaciones
    const updatedGame = await GameModel.findByPk(id, {
      include: [
        { model: CategoryModel, as: "categories" },
        { model: LanguageModel, as: "languages" },
        { model: PlayersModeModel, as: "players_modes" },
        { model: SoModel, as: "sos" },
      ],
    });

    // Devolver el juego actualizado
    return res.status(StatusCodes.OK).json(updatedGame);
  } catch (error) {
    console.error("Error updating game:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
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

const postComment = async (req, res) => {
  const { id } = req.params;
  let data = req.body;

  const game = await GameModel.findByPk(id, {
    include: [
      {
        model: CommentModel,
        as: "comments",
      },
    ],
  });

  data = {
    ...data,
    game_id: id,
  };

  try {
    if (!game) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Game not found" });
    } else {
      CommentModel.create(data).then((comment) => {
        const avgRating =
          (game.comments.reduce((acc, curr) => acc + curr.rating, 0) +
            data.rating) /
          (game.comments.length + 1);

        game.update({ rating: avgRating });
        res.status(StatusCodes.OK).json(comment);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error creating comment",
    });
  }
};

const gameController = {
  getGame,
  postGame,
  updateGame,
  deleteGame,
  postComment,
};

module.exports = gameController;
