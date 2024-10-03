const UserModel = require("./UserModel");
const GameModel = require("./GameModel");
const UserGameModel = require("./UserGameModel");
const WishlistModel = require("./WishlistModel");
const PaymentMethodModel = require("./PaymentMethodModel");
const SecurityQuestionModel = require("./SecurityQuestionModel");

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
  as: "payment_method",
  onDelete: "CASCADE",
});

PaymentMethodModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

//Preguntas de seguridad
UserModel.belongsTo(SecurityQuestionModel, {
  foreignKey: "security_question_id",
  as: "security_question",
});

module.exports = {
  UserModel,
  GameModel,
  UserGameModel,
  WishlistModel,
  PaymentMethodModel,
  SecurityQuestionModel,
};
