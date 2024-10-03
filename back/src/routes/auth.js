const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/answer/:email", authController.answer);
router.post("/:email", authController.updatePass);

module.exports = router;
