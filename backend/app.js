var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

var { swaggerUi, swaggerSpec } = require("./swagger");

var app = express();

// ---- MIDDLEWARES ----
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ---- ROTAS ----
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/pets", require("./routes/pets"));
app.use("/tutors", require("./routes/tutors"));
app.use("/services", require("./routes/services"));
app.use("/products", require("./routes/products"));
app.use("/agendamentos", require("./routes/agendamentos"));

// ---- SWAGGER ----
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---- 404 ----
app.use(function (req, res, next) {
  next(createError(404));
});

// ---- ERROR HANDLER ----
app.use(function (err, req, res, next) {
  console.error("API ERROR:", err.message);

  res.status(err.status || 500).json({
    error: true,
    message: err.message,
  });
});

module.exports = app;