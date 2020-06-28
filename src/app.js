const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./routes/index.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
