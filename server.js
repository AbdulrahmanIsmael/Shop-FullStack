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

const app = express();

// constants
const PORT = 3000;

// setting up the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// parsing data middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files middleware
app.use(express.static(path.join(__dirname, "public")));

// consuming routers
app.use("/admin", adminRouter);
app.use(productsRouter);
app.use(shopRouter);

// 404 error page
app.use(errorController.getErrorPage);

// listening to the server and handling error
app.listen(PORT, (err) => {
  if (err) return console.error("Something Went Wrong, Try Later!", err);
  console.log(`Server running on port ${PORT}`);
});
