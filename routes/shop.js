const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getMainPage);
router.get("/cart", shopController.getCartPage);
router.post("/cart", shopController.postProductToCart);
router.post("/delete-from-cart", shopController.postDeleteFromCart);
router.get("/orders", shopController.getOrdersPage);
router.get("/checkout", shopController.getCheckoutPage);

module.exports = router;
