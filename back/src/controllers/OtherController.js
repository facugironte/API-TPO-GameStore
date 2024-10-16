const { StatusCodes } = require("http-status-codes");
const {
  UserModel,
  PaymentMethodModel,
  LanguageModel,
  PlayersModeModel,
  CategoryModel,
  SecurityQuestionModel,
  SoModel,
  GameModel,
} = require("../database/models/associations");

const getUsers = async (req, res) => {
  const users = await UserModel.findAll({
    include: [{ model: PaymentMethodModel, as: "payment_methods" }],
  });
  res.status(StatusCodes.OK).json(users);
};

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

    const gamesPromises = [
      [
        4,
        "FC25",
        2,
        10,
        "Descripcion del juego",
        "https://preview.redd.it/fc-25-standard-cover-v0-19e17zsww2dd1.jpeg?auto=webp&s=67b9494ac228ce14db9e0464d68ead164f0a6f19",
        "https://i3.wp.com/readwrite.com/wp-content/uploads/2024/07/eafc25-900x506.jpg?w=900&resize=900,505&ssl=1",
        "https://www.youtube.com/embed/pBM2xyco_Kg?si=2JubSLQda_LBk4B5",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        2,
        null,
        null,
        null,
        "2024-10-11 21:53:03",
        "2024-10-14 16:49:10",
      ],
      [
        5,
        "Elder Ring",
        2,
        20,
        "Descripcion del juego",
        "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
        "https://i.redd.it/9oy8b1kalnfb1.jpg",
        "https://www.youtube.com/embed/CptaXqVY6-E?si=gDIjyUU8VsmCY3-F",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        2,
        null,
        null,
        null,
        "2024-10-11 19:23:09",
        "2024-10-14 16:49:31",
      ],
      [
        7,
        "2K24",
        2,
        30,
        "Descripcion del juego",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsk8i4pufaPc3pFc2D-0e9nGbId1R0X7TFg&s",
        "https://ih1.redbubble.net/image.5452522888.0323/st,small,507x507-pad,600x600,f8f8f8.jpg",
        "https://www.youtube.com/embed/GITzbGIiNKg?si=Lb9OwErjaxF0Xh0J",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        2,
        null,
        null,
        null,
        "2024-10-11 21:56:26",
        "2024-10-14 16:49:59",
      ],
      [
        8,
        "Toy Story 3",
        2,
        40,
        "Descripcion del juego",
        "https://upload.wikimedia.org/wikipedia/en/6/6c/Toy_Story_3_Cover_Art.jpg",
        "https://logowik.com/content/uploads/images/933_toy_story_3_logo.jpg",
        "https://www.youtube.com/embed/UzI1adBB170?si=s-USUtuMdrbJqaD5",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        6,
        null,
        null,
        null,
        "2024-10-11 21:56:34",
        "2024-10-14 16:50:29",
      ],
      [
        9,
        "Slenderman",
        2,
        50,
        "Descripcion del juego",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3aknrmQt0WVf-a2tFHD_HalFZiq0r1UhKQ&s",
        "https://upload.wikimedia.org/wikipedia/commons/e/ef/Slender_Logo.jpg",
        "https://www.youtube.com/embed/nFtpFxZTpRg?si=VFX_1RavB78NQ0VZ",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        2,
        null,
        null,
        null,
        "2024-10-11 21:56:43",
        "2024-10-14 16:53:02",
      ],
      [
        10,
        "Minecraft",
        2,
        60,
        "Descripcion del juego",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRALJpPBLWnLl5bu59uxeL_R-1gvUOgn9Crw&s",
        "https://i.pinimg.com/222x/82/b2/1f/82b21fe6d9166c673eed585a5fc38ef5.jpg",
        "https://www.youtube.com/embed/MmB9b5njVbA?si=draXAqf0hPTtWEFM",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        1,
        null,
        null,
        null,
        "2024-10-11 21:56:46",
        "2024-10-14 16:38:39",
      ],
      [
        11,
        "Red Dead Redemption II",
        2,
        70,
        "Descripcion del juego",
        "https://assets.vg247.com/current//2018/05/red_dead_redemption_2_cover_art_1.jpg",
        "https://cdn2.steamgriddb.com/icon/2e65f2f2fdaf6c699b223c61b1b5ab89.png",
        "https://www.youtube.com/embed/MyaYlbizpvs?si=eNiZqtYkDNOFpKfT",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        2,
        null,
        null,
        null,
        "2024-10-11 21:50:51",
        "2024-10-12 20:26:36",
      ],
      [
        12,
        "Counter Strike 2",
        2,
        80,
        "Descripcion del juego",
        "https://upload.wikimedia.org/wikipedia/en/f/f2/CS2_Cover_Art.jpg",
        "https://preview.redd.it/emj6kvnpn1mc1.png?auto=webp&s=31e5fd7e85045ea85be94b15b9861b98f7a722ee",
        "https://www.youtube.com/embed/c80dVYcL69E?si=5xvkTTffK7OgP1lX",
        "PUBLICADO",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null,
        1,
        10,
        null,
        null,
        null,
        "2024-10-11 21:54:43",
        "2024-10-11 21:54:43",
      ],
    ].map(async (game) => {
      return GameModel.create({
        id: game[0],
        name: game[1],
        company_id: game[2],
        price: game[3],
        description: game[4],
        cover_url: game[5],
        logo_url: game[6],
        video_url: game[7],
        state: game[8],
        minCpu: game[9],
        minGpu: game[10],
        minRam: game[11],
        minStorage: game[12],
        minSound: game[13],
        optCpu: game[14],
        optGpu: game[15],
        optRam: game[16],
        optStorage: game[17],
        optSound: game[18],
        rating: game[19],
        sales: game[20],
        visualizations: game[21],
        addToWishlist: game[22],
        salesOverViews: game[23],
        createdAt: game[24],
        updatedAt: game[25],
      });
    });

    await Promise.all(gamesPromises);
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
  getUsers,
  cargar,
};

module.exports = otherController;
