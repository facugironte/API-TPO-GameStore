const express = require("express");
const cors = require("cors");
const auth_routes = require("./src/routes/auth");
const users_routes = require("./src/routes/users");
const games_routes = require("./src/routes/games");

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

//Rutas
app.use("/api/v1/auth", auth_routes);
app.use("/api/v1/users", users_routes);
app.use("/api/v1/games", games_routes);
