const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getMainPage);

router.post("/products", productsController.postProducts);

router.get("/products", productsController.getProductsPage);

module.exports = router;
