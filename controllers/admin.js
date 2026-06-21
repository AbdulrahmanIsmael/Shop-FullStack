const Product = require("../models/product");

// get the add product admin page
exports.getAddProductPage = (req, res, next) => {
  res.render("admin/form-product.ejs", {
    title: "Admin - Add Product",
    editing: false,
    product: {},
  });
};

// get the edit product admin page
exports.getEditProductPage = (req, res, next) => {
  const editQuery = req.query.edit;
  if (!editQuery) {
    return res.redirect("/");
  }

  const productId = +req.params.productId;
  Product.getProductById(productId, (product) => {
    if (!product) return res.redirect("/");
    res.render("admin/form-product.ejs", {
      title: "Admin - Edit Product",
      editing: editQuery,
      product,
    });
  });
};

// Post request to edit an existing product
exports.postEditProduct = (req, res, next) => {
  // ! Edit the product by replacing the new one in the products array in the file json (database later) | NEEDS ADD FUNCTIONALITY IN THE MODEL
  const updatedProduct = req.body;
  const productInstance = new Product(
    updatedProduct.productName,
    updatedProduct.productQuantity,
    updatedProduct.productPrice,
    updatedProduct.productImage,
    updatedProduct.productDesc,
    +updatedProduct.productId,
  );
  productInstance.save();
  res.redirect("/admin/products");
};

// get the products admin page
exports.getAdminProductsPage = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("admin/products.ejs", {
      title: "Admin - Products",
      products,
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.delete(+productId);
  res.redirect("/products");
};

// add new product (POST)
exports.postProducts = (req, res, next) => {
  const {
    productName,
    productQuantity,
    productPrice,
    productImage,
    productDesc,
  } = req.body;

  const product = new Product(
    productName,
    productQuantity,
    productPrice,
    productImage,
    productDesc,
  );
  product.save();

  res.redirect("/products");
};
