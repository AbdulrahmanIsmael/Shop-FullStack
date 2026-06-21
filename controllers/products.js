const Product = require("../models/product");

// get products page
exports.getProductsPage = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("shop/products-list.ejs", {
      title: "Products Page",
      products,
    });
  });
};

// get product details page
exports.getProductDetailsById = (req, res, next) => {
  const productId = +req.params.productId;
  Product.getProductById(productId, (product) => {
    res.render("shop/product-details.ejs", {
      title: product.productName,
      product,
    });
  });
};
