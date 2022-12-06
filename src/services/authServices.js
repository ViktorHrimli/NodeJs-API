const mongoose = require("../db/index");

const userShema = require("../db/user/model");
const User = mongoose.model("user", userShema);

const signInUser = async (body) => {
  console.log(body);
  const newUser = await User.create({ body });
  return newUser;
};

const loginUser = async (body) => {};

module.exports = { signInUser, loginUser };
