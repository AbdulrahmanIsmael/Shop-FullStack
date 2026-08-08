const Product = require("../models/product");

const { handleError } = require("../utils/errorHandler");

// get products page
exports.getProductsPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/products-list.ejs", {
        title: "Products Page",
        products,
      });
    })
    .catch((err) => handleError(res, err));
};

// get product details page
exports.getProductDetailsById = (req, res, next) => {
  const productId = +req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-details.ejs", {
        title: product.title,
        product,
      });
    })
    .catch((err) => handleError(res, err));
};
