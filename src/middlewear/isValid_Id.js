const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const id = req.params.contactId;

  if (!isValidObjectId(id)) {
    res.status(404).json({
      message: "Is not valid id",
      code: 400,
    });
  }

  next();
};

module.exports = isValidId;
