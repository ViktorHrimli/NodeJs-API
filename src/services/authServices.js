const mongoose = require("../db/index");

const userShema = require("../db/user/shema");
const User = mongoose.model("user", userShema);

const signInUser = async (body) => {
  const newUser = await User.create(body);
  return newUser;
};

const loginUser = async (body) => {
  // const { email, password } = body;
  const isLogin = await User.findOne({});
  return isLogin;
};

module.exports = { signInUser, loginUser };
