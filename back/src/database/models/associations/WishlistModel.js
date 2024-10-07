const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db");

class WishlistModel extends Model {}

WishlistModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "games", // nombre de la tabla en minúsculas
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "wishlist",
  }
);

module.exports = WishlistModel;
