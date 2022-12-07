const { success } = require("../utils/codeResponse");
const {
  loginUser,
  signInUser,
  logOutUser,
} = require("../services/authServices");

const authSignUp = async (req, res) => {
  const newUser = await signInUser(req.body);

  res.status(201).json(success(201, newUser));
};

const authLogin = async (req, res) => {
  const newUser = await loginUser(req.body);

  res.status(201).json(success(201, newUser));
};

const authLogOut = async (req, res) => {
  const { id } = req.user;
  await logOutUser(id);
  console.log(req.token);
  req.token = null;
  res.status(204).json(success(204, "No Content"));
};

module.exports = { authSignUp, authLogin, authLogOut };
