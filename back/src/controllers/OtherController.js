const { StatusCodes } = require("http-status-codes");
const {
  LanguageModel,
  PlayersModeModel,
  CategoryModel,
  SecurityQuestionModel,
  SoModel,
} = require("../database/models/associations");

const cargar = async (req, res) => {
  try {
    const languagesPromises = ["Inglés", "Español", "Francés"].map(
      async (language) => {
        return LanguageModel.create({ name: language });
      }
    );
    const modesPromises = ["Un jugador", "Dos jugadores", "Online"].map(
      async (mode) => {
        return PlayersModeModel.create({ name: mode });
      }
    );
    const categoriesPromises = [
      "Acción",
      "Aventura",
      "Terror",
      "Infantil",
      "Ciencia Ficción",
      "Deportes",
      "Simulación",
      "Rol",
    ].map(async (category) => {
      return CategoryModel.create({ name: category });
    });

    const sosPromises = ["macOS", "Windows", "Linux"].map(async (sos) => {
      return SoModel.create({ name: sos });
    });

    const questionsPromises = [
      "Nombre de tu primera mascota",
      "Nombre de tu película favorita",
      "Nombre de tu libro favorito",
      "Nombre canción favorita",
    ].map(async (question) => {
      return SecurityQuestionModel.create({ question: question });
    });

    await Promise.all(sosPromises);
    await Promise.all(languagesPromises);
    await Promise.all(modesPromises);
    await Promise.all(categoriesPromises);
    await Promise.all(questionsPromises);
    res.status(StatusCodes.OK).json({
      message: "Todo cargado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error al cargar",
    });
  }
};

const otherController = {
  cargar,
};

module.exports = otherController;
