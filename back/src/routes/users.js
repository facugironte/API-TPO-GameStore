const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController.js");

router.get("/profile/:email", userController.getUserProfile);
router.post("/profile/:email", userController.updateUserProfile);
router.get("/:email/wishlist", userController.getUserWishlist);
router.post("/:email/game/:game_id/wishlist", userController.addToWishlist);
router.delete(
  "/:email/game/:game_id/wishlist",
  userController.deleteFromWishlist
);

router.post("/:id?/payment-method", userController.postPaymentMethod);

module.exports = router;
