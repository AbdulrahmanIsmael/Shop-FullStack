const Product = require("../models/product");

const { handleError } = require("../utils/errorHandler");

// get the main page
exports.getMainPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        title: "Shop",
        products,
      });
    })
    .catch((err) => handleError(res, err));
};

// get the cart page
exports.getCartPage = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      const totalPrice = products.reduce(
        (acc, prod) =>
          +acc +
            +prod?.dataValues?.price * +prod?.dataValues?.cartItem?.quantity ||
          0,
        0,
      );

      res.render("shop/cart", {
        title: "My Cart",
        products: products,
        totalPrice: totalPrice ?? 0,
      });
    })
    .catch((err) => handleError(res, err));
};

// add product to cart
exports.postProductToCart = (req, res, next) => {
  const productId = +req.body.productId;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) =>
      cart.getProducts({ where: { id: productId } }).then((products) => ({
        products,
        cart,
      })),
    )
    .then(({ products, cart }) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.dataValues.cartItem.quantity;
        newQuantity += oldQuantity;
        return { product, cart };
      }

      return Product.findByPk(productId).then((product) => ({ product, cart }));
    })
    .then(({ product, cart }) =>
      cart.addProduct(product, { through: { quantity: newQuantity } }),
    )
    .then(() => res.redirect("/cart"))
    .catch((err) => handleError(res, err));
};

exports.postDeleteFromCart = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then(([product]) => {
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => err && handleError(res, err));
};

// post new order
exports.postOrder = (req, res, next) => {
  let fetchedProducts;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      fetchedProducts = products;
      return req.user.createOrder();
    })
    .then((order) =>
      order.addProducts(
        fetchedProducts.map((product) => {
          product.orderItem = {
            quantity: +product.cartItem.quantity,
          };
          return product;
        }),
      ),
    )
    .then(() => fetchedCart.setProducts(null))
    .then(() => res.redirect("/orders"))
    .catch((err) => handleError(res, err));
};

// get the orders page
exports.getOrdersPage = (req, res, next) => {
  req.user
    .getOrders({
      include: ["Products"],
    })
    .then((orders) =>
      res.render("shop/orders", {
        title: "My Orders",
        orders,
      }),
    )
    .catch((err) => handleError(res, err));
};
