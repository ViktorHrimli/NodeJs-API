const { validatePostReq, validatePutReq } = require("../../utils/checkReq");
const { failed } = require("../../utils/code");

module.exports = {
  postVaidation: async (req, res, next) => {
    const validateReq = await validatePostReq(req.body);
    if (validateReq) return res.json(failed(400, validateReq.message));
    next();
  },

  putVaidation: async (req, res, next) => {
    const errorField = await validatePutReq(req.body);
    if (errorField === null) {
      return res.json(failed(400, "error, check correct response "));
    }
    next();
  },
};
