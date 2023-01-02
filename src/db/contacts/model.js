const mongoose = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers/");

const Shema = mongoose.Schema;

const contactsShema = new Shema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    phone: {
      type: String,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: true }
);

// FIXME crashed app, this error not captured
contactsShema.post("save", handleMongooseError);

// ================== VALIDATION REQ BODY SCHEMA

const postShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(13).required(),
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

const contactValidation = {
  postShema,
  putShema,
  patchShema,
};

const Contact = mongoose.model("contact", contactsShema);

module.exports = { Contact, contactValidation };
