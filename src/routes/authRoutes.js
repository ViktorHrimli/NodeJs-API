const express = require("express");

const router = express.Router();
const {
  authLogin,
  authSignUp,
  authLogOut,
} = require("../controllers/authController");

// middlewares
const { authWrapp } = require("../middlewars/middlewarValidation");
const authMiddlewar = require("../middlewars/middlewarAuthToken");

router.post("/signup", authWrapp(authSignUp));
router.post("/login", authWrapp(authLogin));
router.all("/logout", authMiddlewar, authLogOut);

module.exports = router;
