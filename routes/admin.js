const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/add-product", productsController.getAddProductPage);

module.exports = router;
