const gravatar = require("gravatar");
const fs = require("fs/promises");
const Jimp = require("jimp");
const path = require("path");
const avatarsPath = path.resolve("./public/avatars");

const { success } = require("../utils/codeResponse");
const {
  loginUser,
  signInUser,
  logOutUser,
  currentUser,
  updateUserSubscribe,
} = require("../services/authServices");

const authSignUp = async (req, res, next) => {
  const avatarUrl = gravatar.url(req.body.email, {
    s: "250",
    protocol: "http",
  });
  const newUser = await signInUser({ ...req.body, avatarUrl }, res);

  res.status(201).json(success(201, newUser));
};

const authLogin = async (req, res, next) => {
  const newUser = await loginUser(req.body);

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
  const { filename } = req.file;
  const img = await resize(filename);
  await fs.appendFile(avatarsPath, img.toString());
  res
    .status(200)
    .json({ message: "Succssesfull", avatarUrl: req.file.fileName });
};

async function resize(filename) {
  const image = await (await Jimp.read(`tmp/${filename}`)).resize(250, 250);

  return await image.writeAsync(`test/${Date.now()}_250x250.jpg`);
}

module.exports = {
  authSignUp,
  authLogin,
  authLogOut,
  authCurrentUser,
  authUpdate,
  authAvatarUpdate,
};
