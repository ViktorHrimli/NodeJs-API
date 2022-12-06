const handleError = (error, data, next) => {
  const { name, code } = error;
  if (name === "MongoServerError" && code === 11000) {
    return (error.status = 409);
  } else {
    return (error.status = 409);
  }
};

module.exports = { handleError };
