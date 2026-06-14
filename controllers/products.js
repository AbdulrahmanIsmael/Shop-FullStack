const Product = require("../models/product");

exports.getMainPage = (req, res, next) => {
  res.redirect("/products");
};

exports.getProductsPage = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("products.ejs", {
      title: "Products Page",
      products,
    });
  });
};

exports.postProducts = (req, res, next) => {
  const { productName, productQuantity, productPrice } = req.body;

  const product = new Product(productName, productQuantity, productPrice);
  product.add();

  res.redirect("/products");
};

exports.getAddProductPage = (req, res, next) => {
  res.render("add-product.ejs", {
    title: "Add Product Page",
  });
};
