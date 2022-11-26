const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const loginRouter = require("./routes/login");

const { dbConnection } = require("./db/db");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(
  session({
    secret: "apiLogin",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/login", loginRouter);

dbConnection();

module.exports = app;
