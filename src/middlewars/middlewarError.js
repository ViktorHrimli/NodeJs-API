const { MyNewError } = require("../helpers/ApiHandleError");

const errorhandler = (err, req, res, next) => {
  if (err instanceof MyNewError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

module.exports = { errorhandler };
