const gravatar = require("gravatar");
const fs = require("fs/promises");

const path = require("path");
// path dir
const tmpPath = path.resolve("./tmp");
const uploadDir = path.resolve("./public/avatars");

const resize = require("../utils/resizeImg");

const { success } = require("../utils/codeResponse");

const {
  loginUser,
  signInUser,
  logOutUser,
  currentUser,
  updateUserSubscribe,
  newAvatarUser,
} = require("../services/authServices");

const authSignUp = async (req, res, next) => {
  const avatarUrl = gravatar.url(req.body.email, {
    s: "250",
    protocol: "http",
  });

  const newUser = await signInUser({ ...req.body, avatarUrl });

  if (!newUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  res.status(201).json(success(201, newUser));
  return newUser;
};

const authLogin = async (req, res, next) => {
  const newUser = await loginUser(req.body);

  if (!newUser) {
    return res.status(401).json({
      status: "filed",
      message: `Wrrong email or password!`,
    });
  }

  res.status(200).json(success(200, newUser));
};

const authLogOut = async (req, res, next) => {
  const { id } = req.user;
  await logOutUser(id);
  req.user = null;
  req.token = null;

  res.status(204).json(success(204, "No Content"));
};

const authCurrentUser = async (req, res, next) => {
  const user = await currentUser(req.token, req.user);

  res.status(200).json(success(200, user));
};

const authUpdate = async (req, res, next) => {
  const { id } = req.user;
  const newUser = await updateUserSubscribe(id, req.body);

  res.status(200).json(success(200, newUser));
};

const authAvatarUpdate = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: "filed",
      message: "Empty field, please enter image with '.jpeg, .png, .svg' ",
    });
  }

  const { filename } = req.file;

  const tmpFile = `${tmpPath}\\${filename}`;
  const avatarsFile = `${uploadDir}\\${filename}`;

  resize(filename);

  await fs.unlink(tmpFile);
  await newAvatarUser(req.user._doc, avatarsFile);

  res.status(200).json({ message: "Ok", avatarUrl: filename });
};

module.exports = {
  authSignUp,
  authLogin,
  authLogOut,
  authCurrentUser,
  authUpdate,
  authAvatarUpdate,
};
