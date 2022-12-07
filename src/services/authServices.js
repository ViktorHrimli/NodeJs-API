const mongoose = require("../db/index");
const {
  AutoraizedError,
  ConflicktError,
} = require("../helpers/ApiHandleError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userShema = require("../db/user/shema");

const User = mongoose.model("user", userShema);

const signInUser = async (body) => {
  const { email } = body;
  const findIsUser = await User.findOne({ email });

  if (findIsUser) {
    throw new ConflicktError("Email in use");
  }

  const newUser = await User.create(body);

  const data = {
    email: newUser.email,
    subscription: newUser.subscription,
  };
  return data;
};

const loginUser = async (body) => {
  const { email, password } = body;
  const isLogin = await User.findOne({ email });

  if (!isLogin) {
    throw new AutoraizedError(`Not found user with email:'${email}'!`);
  }

  if (!(await bcrypt.compare(password, isLogin.password))) {
    throw new AutoraizedError(`Wrong email or password!`);
  }

  const token = jwt.sign(
    {
      id: isLogin._id,
      email: isLogin.email,
      subscription: isLogin.subscription,
    },
    process.env.SECRET_WORD
  );

  const isSuccessLogin = {
    token,
    user: {
      email: isLogin.email,
      subscription: isLogin.subscription,
    },
  };

  return isSuccessLogin;
};

const logOutUser = async (id) => {
  return await User.findOne({ id });
};

module.exports = { signInUser, loginUser, User, logOutUser };
