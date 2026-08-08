// get the error page
exports.getErrorPage = (req, res, next) => {
  res.render("404.ejs", {
    title: "Page Not Found",
  });
};
