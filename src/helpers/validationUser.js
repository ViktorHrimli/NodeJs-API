const Joi = require("joi");

const postUserShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  password: Joi.string().min(8).max(14).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  avatarUrl: Joi.string(),
});

const patchUserShema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const userShema = {
  postUserShema,
  patchUserShema,
};

module.exports = userShema;
