const mongoose = require("../db/index");
const {
  AutoraizedError,
  ConflicktError,
} = require("../helpers/ApiHandleError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userShema = require("../db/user/model");
const User = mongoose.model("user", userShema);

const signInUser = async (body, next) => {
  const { email } = body;
  const findIsUser = await User.findOne({ email });

  if (findIsUser) {
    return next(new ConflicktError("Email in use"));
  }

  const newUser = await User.create(body, { runValidators: true });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
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

  return {
    token,
    user: {
      email: isLogin.email,
      subscription: isLogin.subscription,
    },
  };
};

const updateUserSubscribe = async (id, body) => {
  const newUser = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).select({
    email: 1,
    subscription: 1,
  });
  return newUser;
};

const logOutUser = async (id) => {
  return await User.findOne({ id });
};

const currentUser = async (newToken, { _id, email, subscription }) => {
  return {
    _id,
    email,
    subscription,
    token: newToken,
  };
};

module.exports = {
  signInUser,
  loginUser,
  User,
  logOutUser,
  currentUser,
  updateUserSubscribe,
};
