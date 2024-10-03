const express = require("express");
const router = express.Router();

const gameController = require("../controllers/GameController.js");

router.get("/:id?", gameController.getGame);
router.post("/:id", gameController.updateGame);
router.post("/", gameController.postGame);
router.delete("/:id", gameController.deleteGame);
router.post("/shop/:id_user/:id_game", gameController.buyGame);

module.exports = router;
