const jwt = require("jsonwebtoken");

const { User } = require("../db/user/model");

const HttpError = require("../helpers/ApiHandleError");

const { SECRET_WORD } = process.env;

const authMiddlewar = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Please provide a token"));
  }

  try {
    const { id } = jwt.decode(token, SECRET_WORD);
    const user = await User.findOne({ _id: id });

    if (!user) {
      next(HttpError(401, "Invalid token"));
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Invalid token"));
  }
};

module.exports = authMiddlewar;
