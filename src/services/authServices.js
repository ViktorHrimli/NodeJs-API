const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../db/user/model");

const signInUser = async (body) => {
  const newUser = await User.create({ ...body });

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      subscription: newUser.subscription,
    },
    process.env.SECRET_WORD
  );

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
    token,
  };
};

const loginUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return null;
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    process.env.SECRET_WORD
  );

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
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

const newAvatarUser = async (user, avatarUrl) => {
  const updateUser = { ...user, avatarUrl };

  return await User.findOneAndUpdate({ _id: user._id }, updateUser);
};

module.exports = {
  signInUser,
  loginUser,
  logOutUser,
  currentUser,
  updateUserSubscribe,
  newAvatarUser,
};
