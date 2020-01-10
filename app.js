const models = require("./models/index.js");
const methodOverride = require("method-override");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
var request = require("request");
const connectflash = require("connect-flash");
const async = require("async");
const bcrypt = require("bcrypt");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cors = require("cors");

const app = express();
app.io = require("socket.io")();

models.sequelize
  .sync()
  .then(() => {
    console.log(" DB 연결 성공");
  })
  .catch(err => {
    console.log("연결 실패");
    console.log(err);
  });

// view engine setupmm
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(connectflash());
app.use(methodOverride("_method"));
app.use(cors());

app.use("/", indexRouter);
app.use("/user", usersRouter);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
    rolling: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
