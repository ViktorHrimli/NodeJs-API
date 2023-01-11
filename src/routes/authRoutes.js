const express = require("express");
const router = express.Router();
// img
const upload = require("../storage/storage");
// controllers
const {
  authLogin,
  authSignUp,
  authLogOut,
  authCurrentUser,
  authUpdate,
  authAvatarUpdate,
  authTokenVerifyUser,
  authRepeatadlyEmail,
} = require("../controllers/authController");

// shema validation

const {
  userValidation: { patchUserShema, postUserShema, verificationTokenSchema },
} = require("../db/user/model");

// middlewares
const { authToken, wrapper, validate } = require("../middlewars");

// routers
router.get("/verify/:verificationToken", authTokenVerifyUser);

router.post("/signup", validate(postUserShema), wrapper(authSignUp));

router.post("/login", validate(postUserShema), wrapper(authLogin));

router.post(
  "/verify",
  validate(verificationTokenSchema),
  wrapper(authRepeatadlyEmail)
);

router.patch(
  "/avatars",
  validate(patchUserShema),
  authToken,
  upload.single("avatar"),
  authAvatarUpdate
);

router.patch("/", validate(patchUserShema), authToken, wrapper(authUpdate));

router.get("/current", authToken, authCurrentUser);

router.all("/logout", authToken, authLogOut);

module.exports = router;
