function handleError(res, err = null) {
  if (err) console.log(err);
  res.render("404.ejs", {
    title: "Page Not Found",
  });
}

module.exports.handleError = handleError;
