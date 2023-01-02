const express = require("express");
const upload = require("../storage/storage");

const router = express.Router();
const {
  authLogin,
  authSignUp,
  authLogOut,
  authCurrentUser,
  authUpdate,
  authAvatarUpdate,
} = require("../controllers/authController");

// middlewares
const {
  authMiddlewar,
  mdlwValidation: { authWrapp },
} = require("../middlewars");

// routers
router.post("/signup", authWrapp(authSignUp));

router.post("/login", authWrapp(authLogin));

router.patch(
  "/avatars",
  authMiddlewar,
  upload.single("avatar"),
  authAvatarUpdate
);

router.patch("/", authMiddlewar, authWrapp(authUpdate));

router.get("/current", authMiddlewar, authCurrentUser);

router.all("/logout", authMiddlewar, authLogOut);

module.exports = router;
