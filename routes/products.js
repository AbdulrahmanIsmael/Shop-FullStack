const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/products", productsController.getProductsPage);

router.get("/products/:productId", productsController.getProductDetailsById);

module.exports = router;
