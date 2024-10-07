const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController.js");

router.post("/payment-method/:email", shopController.postPaymentMethod);
router.post("/", shopController.buyGame);

module.exports = router;
