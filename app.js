const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
//
const contactsRouter = require("./src/routes/contactsRoutes");
const authRouter = require("./src/routes/authRoutes");
const avatarRouter = require("./src/routes/avatarsRouters");

const {
  Error: { error404, errorhandler },
} = require("./src/helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// router
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/avatars", avatarRouter);

// error
app.use(error404);
app.use(errorhandler);

module.exports = app;
