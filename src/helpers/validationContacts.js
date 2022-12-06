const Joi = require("joi");

const postShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(8).max(14).required(),
  favorite: Joi.boolean(),
});

const putShema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(8).max(14),
});

const patchShema = Joi.object({
  favorite: Joi.boolean().required(),
});

const shemaBody = {
  postShema,
  putShema,
  patchShema,
};

module.exports = shemaBody;
