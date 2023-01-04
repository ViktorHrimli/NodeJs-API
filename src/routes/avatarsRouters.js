const express = require("express");
const router = express.Router();
const path = require("path");

const uploadDir = path.resolve("./public/avatars");

router.use("/", express.static(uploadDir));

module.exports = router;
