const fs = require("fs");
const path = require("path");

const __rootDir = require("../utils/path");

const Cart = require("./cart");

module.exports = class Product {
  static #productsPath = path.join(__rootDir, "data", "products.json");

  constructor(
    productName,
    productQuantity,
    productPrice,
    productImage,
    productDesc,
    productId = null,
  ) {
    this.productName = productName;
    this.productQuantity = productQuantity;
    this.productPrice = productPrice;
    this.productImage = productImage;
    this.productDesc = productDesc;
    this.productId = productId;
  }

  // to add new product
  save() {
    Product.getAllProducts((products) => {
      if (this.productId) {
        const existingProductIndex = products.findIndex(
          (product) => product.productId === this.productId,
        );
        const updatedProducts = [...products];

        updatedProducts[existingProductIndex] = this;
        fs.writeFile(
          Product.#productsPath,
          JSON.stringify(updatedProducts),
          (err) => console.error(err),
        );
      } else {
        products.push({ ...this, productId: products.length + 1 });
        fs.writeFile(Product.#productsPath, JSON.stringify(products), (err) =>
          console.error(err),
        );
      }
    });
  }

  static delete(productId) {
    this.getAllProducts((products) => {
      const updatedProducts = products.filter(
        (product) => product.productId !== productId,
      );
      fs.writeFile(
        this.#productsPath,
        JSON.stringify(updatedProducts),
        (err) => {
          if (!err) {
            // Delete Product From Cart
            const { productPrice } = products.find(
              (product) => product.productId === productId,
            );
            Cart.deleteProductFromCart(productId, productPrice);
          }
          console.error(err);
        },
      );
    });
  }

  static getProductById(id, fn) {
    this.getAllProducts((products) => {
      const targetProduct = products.find(
        (product) => product.productId === id,
      );
      return fn(targetProduct);
    });
  }

  static getAllProducts(fn) {
    this.#readProductsFromFile(fn);
  }

  static #readProductsFromFile(fn) {
    fs.readFile(this.#productsPath, (err, data) => {
      if (err || !data || !data.length) {
        return fn([]);
      }
      return fn(JSON.parse(data));
    });
  }
};
