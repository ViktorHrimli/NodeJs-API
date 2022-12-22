const { success } = require("../utils/codeResponse");

const postAvatars = async (req, res, next) => {
  res.status(201).json(success(201, "success"));
};

module.exports = {
  postAvatars,
};
