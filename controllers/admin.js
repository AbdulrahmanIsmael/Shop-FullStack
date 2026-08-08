const Product = require("../models/product");

const { handleError } = require("../utils/errorHandler");

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
  Product.findByPk(+productId)
    .then((product) => {
      if (!product) return res.redirect("/");
      res.render("admin/form-product.ejs", {
        title: "Admin - Edit Product",
        editing: editQuery,
        product,
      });
    })
    .catch((err) => err && handleError(res, err));
};

// Post request to edit an existing product
exports.postEditProduct = (req, res, next) => {
  const {
    productName,
    productQuantity,
    productPrice,
    productImage,
    productDesc,
    productId,
  } = req.body;

  req.user
    .getProducts({ where: { id: productId } })
    .then(([product]) => {
      product.title = productName;
      product.quantity = productQuantity;
      product.price = productPrice;
      product.imageUrl = productImage;
      product.description = productDesc;

      return product.save();
    })
    .then(() => {
      console.log("Updated product!");
      res.redirect("/admin/products");
    })
    .catch((err) => handleError(res, err));
};

// get the products admin page
exports.getAdminProductsPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products.ejs", {
        title: "Admin - Products",
        products,
      });
    })
    .catch((err) => handleError(res, err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = +req.params.productId;
  Product.findByPk(+productId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log("Deleted product!");
      res.redirect("/products");
    })
    .catch((err) => err && handleError(res, err));
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

  req.user
    .createProduct({
      title: productName,
      description: productDesc,
      price: productPrice,
      quantity: productQuantity,
      imageUrl: productImage,
    })
    .then(() => {
      console.log("Created product!");
      res.redirect("/admin/products");
    })
    .catch((err) => handleError(res, err));
};
