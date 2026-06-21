const Product = require("../models/product");
const Cart = require("../models/cart");

// get the main page
exports.getMainPage = (req, res, next) => {
  Product.getAllProducts((products) => {
    res.render("shop/index", {
      title: "Shop",
      products,
    });
  });
};

// get the cart page
exports.getCartPage = (req, res, next) => {
  Cart.getAllCartProducts((cart) => {
    Product.getAllProducts((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.productId === product.productId,
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        title: "My Cart",
        products: cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

// add product to cart
exports.postProductToCart = (req, res, next) => {
  const productId = +req.body.productId;
  Product.getProductById(productId, (product) => {
    Cart.addToCart(productId, +product.productPrice);
    res.redirect("/cart");
  });
};

exports.postDeleteFromCart = (req, res, next) => {
  const { productId } = req.body;
  Product.getProductById(+productId, (product) => {
    Cart.deleteProductFromCart(+productId, +product.productPrice);
    res.redirect("/");
  });
};

// get the orders page
exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", {
    title: "My Orders",
  });
};

// get the checkout page
exports.getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
  });
};
