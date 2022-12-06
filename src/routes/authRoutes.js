const express = require("express");

const router = express.Router();
const { authLogin, authSignUp } = require("../controllers/authController");

// middlewares
const isValidID = require("../middlewars/isValid_Id");
const { authWrapp } = require("../middlewars/wrapperValidation");

router.post("/signup", authWrapp(authSignUp));
router.post("/login", authWrapp(authLogin));

module.exports = router;
