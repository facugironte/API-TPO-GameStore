const UserModel = require("./basics/UserModel");

const GameModel = require("./basics/GameModel");
const CommentModel = require("./basics/CommentModel");

const UserGameModel = require("./associations/UserGameModel");
const WishlistModel = require("./associations/WishlistModel");

const PaymentMethodModel = require("./basics/PaymentMethodModel");
const SecurityQuestionModel = require("./basics/SecurityQuestionModel");

const CategoryModel = require("./game_features/CategoryModel");
const GameCategoryModel = require("./associations/GameCategoryModel");
const LanguageModel = require("./game_features/LanguageModel");
const GameLanguageModel = require("./associations/GameLanguageModel");
const PlayersModeModel = require("./game_features/PlayersModeModel");
const GamePlayersModeModel = require("./associations/GamePlayersModeModel");
const SoModel = require("./game_features/SoModel");
const GameSoModel = require("./associations/GameSoModel");

// Definir las relaciones

//Usuario --> juegos
UserModel.belongsToMany(GameModel, {
  through: UserGameModel,
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "purchased_games",
});
GameModel.belongsToMany(UserModel, {
  through: UserGameModel,
  foreignKey: "game_id",
  onDelete: "CASCADE",
  as: "purchased_games",
});

//Usuario --> wishlist
UserModel.belongsToMany(GameModel, {
  through: WishlistModel,
  foreignKey: "user_id",
  onDelete: "CASCADE",
  as: "wishlists",
});
GameModel.belongsToMany(UserModel, {
  through: WishlistModel,
  foreignKey: "game_id",
  onDelete: "CASCADE",
  as: "wishlists",
});

//Usuario --> métodos de pago
UserModel.hasMany(PaymentMethodModel, {
  foreignKey: "user_id",
  as: "payment_methods",
  onDelete: "CASCADE",
});

PaymentMethodModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "users",
});

//Usuario --> Preguntas de seguridad
UserModel.belongsTo(SecurityQuestionModel, {
  foreignKey: "security_question_id",
  as: "security_questions",
});

//Game --> category
GameModel.belongsToMany(CategoryModel, {
  through: GameCategoryModel,
  foreignKey: "game_id",
  onDelete: "CASCADE",
  as: "categories",
});
CategoryModel.belongsToMany(GameModel, {
  through: GameCategoryModel,
  foreignKey: "category_id",
  onDelete: "CASCADE",
  as: "categories",
});

//Game --> language
GameModel.belongsToMany(LanguageModel, {
  through: GameLanguageModel,
  foreignKey: "game_id",
  onDelete: "CASCADE",
  as: "languages",
});
LanguageModel.belongsToMany(GameModel, {
  through: GameLanguageModel,
  foreignKey: "language_id",
  onDelete: "CASCADE",
  as: "languages",
});

//Game --> PlayersMode
GameModel.belongsToMany(PlayersModeModel, {
  through: GamePlayersModeModel,
  foreignKey: "game_id",
  onDelete: "CASCADE",
  as: "players_modes",
});
PlayersModeModel.belongsToMany(GameModel, {
  through: GamePlayersModeModel,
  foreignKey: "players_mode_id",
  onDelete: "CASCADE",
  as: "players_modes",
});

//Game --> Sos
GameModel.belongsToMany(SoModel, {
  through: GameSoModel,
  foreignKey: "game_id",
  onDelete: "CASCADE",
  as: "sos",
});
SoModel.belongsToMany(GameModel, {
  through: GameSoModel,
  foreignKey: "so_id",
  onDelete: "CASCADE",
  as: "sos",
});

//Game --> company
GameModel.belongsTo(UserModel, {
  foreignKey: "company_id",
  as: "company_owner",
  onDelete: "CASCADE",
});
UserModel.hasMany(GameModel, {
  foreignKey: "company_id",
  as: "company_games",
  onDelete: "CASCADE",
});

//Comment --> game
CommentModel.belongsTo(GameModel, {
  foreignKey: "game_id",
  as: "game",
});
GameModel.hasMany(CommentModel, {
  foreignKey: "game_id",
  as: "comments",
  onDelete: "CASCADE",
});

module.exports = {
  UserModel,
  UserGameModel,
  WishlistModel,
  PaymentMethodModel,
  SecurityQuestionModel,
  CommentModel,
  GameModel,
  CategoryModel,
  LanguageModel,
  PlayersModeModel,
  SoModel,
  GameCategoryModel,
  GameLanguageModel,
  GamePlayersModeModel,
  GameSoModel,
};
