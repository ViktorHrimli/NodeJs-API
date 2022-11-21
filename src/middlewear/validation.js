const {
  isValidPostReq,
  isValidPutReq,
  isValidPatchReq,
} = require("../../utils/validationReq");
const { failed } = require("../../utils/code");

module.exports = {
  postVaidation: async (req, res, next) => {
    const validateReq = await isValidPostReq(req.body);
    if (validateReq) return res.json(failed(400, validateReq.message));
    next();
  },

  putVaidation: async (req, res, next) => {
    const errorField = await isValidPutReq(req.body);
    if (errorField === null) {
      return res.json(failed(400, "error, check correct response "));
    }
    next();
  },

  patchVaidation: async (req, res, next) => {
    const errorField = await isValidPatchReq(req.body);
    if (errorField === null) {
      return res.json(failed(400, "wtf "));
    }
    next();
  },
};
