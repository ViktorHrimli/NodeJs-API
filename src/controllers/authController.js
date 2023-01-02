const { success } = require("../utils/codeResponse");
const {
  loginUser,
  signInUser,
  logOutUser,
  currentUser,
  updateUserSubscribe,
} = require("../services/authServices");

const authSignUp = async (req, res, next) => {
  const newUser = await signInUser(req.body, next);

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

module.exports = {
  authSignUp,
  authLogin,
  authLogOut,
  authCurrentUser,
  authUpdate,
};
