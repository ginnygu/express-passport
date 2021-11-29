require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var passport = require("passport");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((e) => {
    console.log(e);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users/users");

var userJWTLoginStrategy = require("./routes/lib/passport/user-passport");

var app = express();

app.use(cors("*"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passport.use("jwt-user", userJWTLoginStrategy);

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: "error", errorMessage: err.message, err });
});

module.exports = app;
