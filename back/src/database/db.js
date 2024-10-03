const { Sequelize } = require("sequelize");
const { database } = require("../config/config");

//Crea la base de datos
const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: database.dialect,
  }
);

//Conectarse a la base de datos

sequelize
  .sync({ force: database.force })
  .then(() => {
    console.log("Conexión a la base de datos exitosa.");
  })
  .catch((error) => {
    console.log(
      "Se ha producido un error al conectarse a la base de datos",
      error
    );
  });

module.exports = sequelize;
