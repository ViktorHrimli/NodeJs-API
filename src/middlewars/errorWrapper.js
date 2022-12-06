const internalServerError = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

const notFoundError = (err, req, res, next) => {
  res.status(404).json({ message: err.message });
};

module.exports = { internalServerError, notFoundError };
