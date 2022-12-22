const express = require("express");

const router = express.Router();
const {
  authLogin,
  authSignUp,
  authLogOut,
  authCurrentUser,
  authUpdate,
} = require("../controllers/authController");

// middlewares
const { authWrapp } = require("../middlewars/middlewarValidation");
const authMiddlewar = require("../middlewars/middlewarAuthToken");

router.patch("/", authMiddlewar, authWrapp(authUpdate));

router.patch("/avatars", authMiddlewar);

router.post("/signup", authWrapp(authSignUp));

router.post("/login", authWrapp(authLogin));

router.get("/current", authMiddlewar, authCurrentUser);

router.all("/logout", authMiddlewar, authLogOut);

module.exports = router;
