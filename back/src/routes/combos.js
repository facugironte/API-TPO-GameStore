const express = require("express");
const router = express.Router();

const combosController = require("../controllers/CombosController.js");

router.get("/languages", combosController.getLanguages);
router.get("/categories", combosController.getCategories);
router.get("/sos", combosController.getSos);
router.get("/player-modes", combosController.getModes);

module.exports = router;
