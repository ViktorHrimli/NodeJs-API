const { HttpError } = require("../helpers");

const validate = (shema) => {
  return (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validate;
