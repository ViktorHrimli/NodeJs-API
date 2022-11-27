const { isValidPost } = require("../../utils/validationShema");
const { failed } = require("../../utils/codeResponse");

const wrapper = (controller) => {
  return async (req, res, next) => {
    const isError = await isValidPost(req.body);
    !isError
      ? controller(req, res)
      : next(res.status(400).json(failed(400, isError.message)));
  };
};

module.exports = { wrapper };
