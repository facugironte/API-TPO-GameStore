const { StatusCodes } = require("http-status-codes");
const {
  LanguageModel,
  CategoryModel,
  SoModel,
  PlayersModeModel,
  SecurityQuestionModel,
} = require("../database/models/associations");

const getLanguages = async (req, res) => {
  LanguageModel.findAll()
    .then((languages) => {
      res.status(StatusCodes.OK).json(languages);
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

const getCategories = async (req, res) => {
  CategoryModel.findAll()
    .then((categories) => {
      res.status(StatusCodes.OK).json(categories);
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

const getSos = async (req, res) => {
  SoModel.findAll()
    .then((sos) => {
      res.status(StatusCodes.OK).json(sos);
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

const getModes = async (req, res) => {
  PlayersModeModel.findAll()
    .then((modes) => {
      res.status(StatusCodes.OK).json(modes);
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

const getQuestions = async (req, res) => {
  SecurityQuestionModel.findAll()
    .then((questions) => {
      res.status(StatusCodes.OK).json(questions);
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    });
};

const combosController = {
  getLanguages,
  getCategories,
  getSos,
  getModes,
  getQuestions,
};

module.exports = combosController;
