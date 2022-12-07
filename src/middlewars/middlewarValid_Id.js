const { isValidObjectId } = require("mongoose");
const { ValidationError } = require("../helpers/ApiHandleError");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    throw new ValidationError("Is not valid id, please enter correct id");
  }
  next();
};

module.exports = isValidId;
