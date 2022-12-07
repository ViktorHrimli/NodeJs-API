const { MyNewError } = require("../helpers/ApiHandleError");

const internalServerError = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

const notFoundError = (err, req, res, next) => {
  res.status(404).json({ message: err.message });
};

const errorhandler = (err, req, res, next) => {
  if (err instanceof MyNewError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

module.exports = { internalServerError, notFoundError, errorhandler };
