const fs = require("fs");
const path = require("path");

const __rootDir = require("../utils/path");

const productsPath = path.join(__rootDir, "data", "products.json");

module.exports = class Product {
  constructor(productName, productQuantity, productPrice) {
    this.productName = productName;
    this.productQuantity = productQuantity;
    this.productPrice = productPrice;
  }

  add() {
    Product.getAllProducts((products) => {
      products.push(this);
      fs.writeFile(productsPath, JSON.stringify(products), (err) =>
        console.error(err),
      );
    });
  }

  static getAllProducts(fn) {
    this.#readProductsFromFile(fn);
  }

  static #readProductsFromFile(fn) {
    fs.readFile(productsPath, (err, data) => {
      if (err || !data || !data.length) {
        return fn([]);
      }
      return fn(JSON.parse(data));
    });
  }
};
