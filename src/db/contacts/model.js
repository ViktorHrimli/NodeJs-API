const mongoose = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers/");

const Shema = mongoose.Schema;

const emailRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegEx = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/gm;

const contactsShema = new Shema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      match: emailRegexp,
      unique: true,
    },
    phone: {
      type: String,
      match: [phoneRegEx, "Must be +380999999999"],
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
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const putShema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(13),
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
