const { ConflicktError } = require("../helpers/ApiHandleError");

const handleError = async (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    next(new ConflicktError(JSON.stringify(error.message)));
  }
};

module.exports = { handleError };
