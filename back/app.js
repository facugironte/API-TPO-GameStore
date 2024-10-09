const express = require("express");
const cors = require("cors");
const auth_routes = require("./src/routes/auth");
const users_routes = require("./src/routes/users");
const games_routes = require("./src/routes/games");
const shop_routes = require("./src/routes/shop");
const other_routes = require("./src/routes/other");

//Creamos app
const app = express();
//Setting port
const PORT = process.env.PORT || 3000;
//Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//Middlewares
app.use(express.json());
app.use(cors());

//Logger
const logger = (req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body && req.method !== "GET") {
    console.log(req.body);
  }
  next();
};

app.use(logger);

//Rutas
app.use("/api/v1/auth", auth_routes);
app.use("/api/v1/users", users_routes);
app.use("/api/v1/games", games_routes);
app.use("/api/v1/shop", shop_routes);
app.use("/api/v1/others", other_routes);
