const express = require("express");

const path = require("path");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const productsRouter = require("./routes/products");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(productsRouter);

app.use((req, res, next) => {
  res.render("404.ejs", {
    title: "Page Not Found",
  });
});

app.listen(8080);
