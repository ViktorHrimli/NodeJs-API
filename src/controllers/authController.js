const gravatar = require("gravatar");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
// path dir
const tmpPath = path.resolve("./tmp");
const uploadDir = path.resolve("./public/avatars");

const {
  code: { success },
  resize,
  createEmailServices,
} = require("../utils");

const {
  loginUser,
  signInUser,
  logOutUser,
  currentUser,
  updateUserSubscribe,
  newAvatarUser,
  serviceVerificationUserToken,
  serviceRepeatadlyEmailSend,
} = require("../services/authServices");

// USer REgister

const authSignUp = async (req, res, next) => {
  const { email } = req.body;

  const avatarUrl = gravatar.url(email, {
    s: "250",
    protocol: "http",
  });

  const verificationToken = uuidv4();

  const newUser = await signInUser({
    ...req.body,
    avatarUrl,
    verificationToken,
  });

  if (!newUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  await createEmailServices(email, verificationToken);

  res.status(201).json(success(201, newUser));
  return newUser;
};

// USER LOGIN

const authLogin = async (req, res, next) => {
  const newUser = await loginUser(req.body, res);

  if (!newUser) {
    return res.status(401).json({
      status: "filed",
      message: `Wrrong email or password!`,
    });
  }

  res.status(200).json(success(200, newUser));
};

// Verificated Token

const authTokenVerifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await serviceVerificationUserToken(verificationToken);
  if (user.verify) {
    return res.status(404).json({
      message: "Verification has already been passed! Token invalid!",
      status: "Filed",
    });
  }

  if (!user) {
    return res.status(400).json({ message: "Not found user", status: "Filed" });
  }
  res.status(200).json({ message: "Verification successful" });
};

// User repetedly email

const authRepeatadlyEmail = async (req, res, next) => {
  const user = await serviceRepeatadlyEmailSend(req.body.email);
  if (user === false) {
    return res.status(400).json({ message: "Not found user", status: "Filed" });
  }
  if (user === null) {
    return res.status(400).json({
      message: "Verification has already been passed",
      status: "Filed",
    });
  }
  res.status(200).json({ message: "Verification email sent" });
};

// User LogOUT

const authLogOut = async (req, res, next) => {
  const { id } = req.user;
  await logOutUser(id);
  req.user = null;
  req.token = null;

  res.status(204).json(success(204, "No Content"));
};

// Get Current User

const authCurrentUser = async (req, res, next) => {
  const user = await currentUser(req.token, req.user);

  res.status(200).json(success(200, user));
};

// User subscribe update

const authUpdate = async (req, res, next) => {
  const { id } = req.user;
  const newUser = await updateUserSubscribe(id, req.body);

  res.status(200).json(success(200, newUser));
};

// User avatar update

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
  authTokenVerifyUser,
  authRepeatadlyEmail,
};
