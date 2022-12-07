const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const contactsRouter = require("./src/routes/contactsRoutes");
const authRouter = require("./src/routes/authRoutes");

const { errorhandler } = require("./src/middlewars/middlewarError");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// router
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

// error
app.use(errorhandler);

module.exports = app;
