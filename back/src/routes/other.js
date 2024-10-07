const express = require("express");
const router = express.Router();

const otherController = require("../controllers/OtherController.js");

router.get("/users", otherController.getUsers);

module.exports = router;
