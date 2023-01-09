const Joi = require("joi");
const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const { handleMongooseError } = require("../../helpers");

const subscribe = ["starter", "pro", "business"];

const userShema = new Shema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscribe,
      default: "starter",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.pre("save", async function () {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
});

userShema.post("save", handleMongooseError);

// =================== VALIDATION USER REQ BODY SCHEMA

const postUserShema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  password: Joi.string().min(8).required(),
  subscription: Joi.string().valid(...subscribe),
  avatarUrl: Joi.string(),
});

const patchUserShema = Joi.object({
  subscription: Joi.string().valid(...subscribe),
  avatarUrl: Joi.string(),
});

const userValidation = {
  postUserShema,
  patchUserShema,
};

const User = mongoose.model("user", userShema);

module.exports = { userValidation, User };
