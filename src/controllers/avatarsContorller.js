const { success } = require("../utils/codeResponse");

const postAvatars = async (req, res, next) => {
  console.log(req.body);
  res.status(200).json(success("Файл успешно загружен"));
};

module.exports = {
  postAvatars,
};
