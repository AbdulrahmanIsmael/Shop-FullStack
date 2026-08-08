const express = require("express");

// packages
const path = require("path");
const bodyParser = require("body-parser");

// router
const adminRouter = require("./routes/admin");
const productsRouter = require("./routes/products");
const shopRouter = require("./routes/shop");

// controllers
const errorController = require("./controllers/error");

// config constants
const { port } = require("./config/server");

// sequelzie db
const sequelize = require("./config/sequelize.js");

// models
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order.js");
const OrderItem = require("./models/order-item.js");

const app = express();

// setting up the templating engine
app.set("view engine", "ejs"); // templating engine name
app.set("views", path.join(__dirname, "views")); // folder path

// parsing data middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files middleware
app.use(express.static(path.join(__dirname, "public")));

// provide the user to any incoming requests
app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user; // storing the user in a new key in the request
    next(); // req.user becomes available in the next requests
  });
});

// consuming routers
app.use("/admin", adminRouter);
app.use(productsRouter);
app.use(shopRouter);

// 404 error page
app.use(errorController.getErrorPage);

// Assosiations - defining the relationship between models
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// cart assosiations
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// order assosiations
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// syncing the database (creating tables for the models if they don't exist)
sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    return user
      ? user
      : User.create({
          username: "Abdulrahman",
          email: "abdulrahmanismael2023@gmail.com",
        });
  })
  .then((user) => {
    return user.getCart().then((cart) => !cart && user.createCart());
  })
  .then(() => {
    app.listen(port, (err) => {
      if (err) return console.error("Something Went Wrong, Try Later!", err);
      console.log(`Server running on port ${port}`);
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => console.log(err));
