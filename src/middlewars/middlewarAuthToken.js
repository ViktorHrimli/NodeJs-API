const jwt = require("jsonwebtoken");
const { User } = require("../services/authServices");
const { AutoraizedError } = require("../helpers/ApiHandleError");

const authMiddlewar = async (req, res, next) => {
  const [typeToken, token] = req.headers.authorization.split(" ");
  console.log(typeToken);
  if (!token) {
    return next(new AutoraizedError("Please provide a token"));
  }

  try {
    const { id } = jwt.decode(token, process.env.SECRET_WORD);

    const user = await User.findOne({ id });

    if (!user) {
      return next(new AutoraizedError("Not authorized"));
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    throw new AutoraizedError("Invailed token");
  }
};

module.exports = authMiddlewar;
