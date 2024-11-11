const express = require("express");
const router = express.Router();

const otherController = require("../controllers/OtherController.js");

router.get("/cargar", otherController.cargar);

module.exports = router;
