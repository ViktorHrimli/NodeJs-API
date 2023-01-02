const jwt = require("jsonwebtoken");
const { User } = require("../services/authServices");

const authMiddlewar = async (req, res, next) => {
  const isToken = req.headers.authorization;
  if (!isToken) {
    return next(res.status(401).json({ message: "Please provide a token" }));
  }
  const [typeToken, token] = req.headers.authorization.split(" ");
  console.log(typeToken);

  try {
    const { id } = jwt.decode(token, process.env.SECRET_WORD);
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(res.status(401).json({ message: "Not authorization" }));
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return next(res.status(401).json({ message: "Invalid token" }));
  }
};

module.exports = authMiddlewar;
