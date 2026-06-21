const fs = require("fs");
const path = require("path");

const __rootDir = require("../utils/path");

module.exports = class Cart {
  static #cartProductsPath = path.join(__rootDir, "data", "cart.json");

  static addToCart(productId, productPrice) {
    Cart.getAllCartProducts((cart) => {
      const existingProductIndex = cart.products.findIndex(
        (product) => productId === product.productId,
      );

      // Updating Quantity / Adding the product
      this.#updateCartWithProduct(
        cart,
        productId,
        productPrice,
        existingProductIndex,
      );

      // Writing the new updatred Cart
      fs.writeFile(this.#cartProductsPath, JSON.stringify(cart), (err) =>
        console.error(err),
      );
    });
  }

  static getAllCartProducts(fn) {
    this.#readCartProductsFromFile(fn);
  }

  static deleteProductFromCart(productId, productPrice) {
    // get All Cart Products
    this.getAllCartProducts((cart) => {
      // check if the product is in the cart or not
      const existingProdCart = cart.products.find(
        (product) => product.productId === productId,
      );
      if (!existingProdCart) {
        return;
      }

      // if it is, filter to remove
      this.#DeleteProduct(cart, existingProdCart, productId, productPrice);
    });
  }

  static getCartLength(fn) {
    this.getAllCartProducts((cart) => {
      if (cart && cart.products && cart.products.length)
        return fn(cart.products.length);
      fn(0);
    });
  }

  static #readCartProductsFromFile(fn) {
    fs.readFile(this.#cartProductsPath, (err, data) => {
      if (err || !data || !data.length) {
        return fn({ products: [], totalPrice: 0 });
      }
      return fn(JSON.parse(data));
    });
  }

  static #updateCartWithProduct(cart, productId, productPrice, productIndex) {
    let updatedProduct;
    if (productIndex !== -1) {
      const existingProduct = cart.products[productIndex];
      updatedProduct = { ...existingProduct };
      updatedProduct.qty += 1;
      cart.products[productIndex] = updatedProduct;
    } else {
      updatedProduct = { productId: productId, qty: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    // Updating the total price
    cart.totalPrice += productPrice;
  }

  static #DeleteProduct(cart, product, productId, productPrice) {
    const updatedCart = { ...cart };
    const updatedCartProducts = cart.products.filter(
      (product) => product.productId !== productId,
    );
    // Update the cart
    updatedCart.products = updatedCartProducts;
    updatedCart.totalPrice -= productPrice * product.qty;
    // rewrite the new array
    fs.writeFile(this.#cartProductsPath, JSON.stringify(updatedCart), (err) =>
      console.error(err),
    );
  }
};
