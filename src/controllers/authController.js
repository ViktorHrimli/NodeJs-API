const { success } = require("../utils/codeResponse");
const { WrongParametrError } = require("../helpers/ApiHandleError");
const { loginUser, signInUser } = require("../services/authServices");

// const addContact = async (body) => {
//   const newUser = await Contact.create(body);
//   return newUser;
// };

const authSignUp = async (req, res) => {
  const body = req.body;
  const newUser = await signInUser(body);

  if (!newUser) {
    throw new WrongParametrError(`Not create new user`);
  }

  res.status(201).json(success(201, newUser));
};

const authLogin = async (req, res) => {
  const body = req.body;
  const newUser = await loginUser(body);

  if (!newUser) {
    throw new WrongParametrError(`Not create new user`);
  }

  //   res.status(201).json(success(201, newUser));
};

module.exports = { authSignUp, authLogin };
