const express = require("express");

const router = express.Router();
const { authLogin, authSignUp } = require("../controllers/authController");

router.post("/signup", authSignUp);
router.post("/login", authLogin);

module.exports = router;
