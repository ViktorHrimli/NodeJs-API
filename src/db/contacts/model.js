const mongoose = require("mongoose");

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
      type: String,
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
  { versionKey: false }
);

module.exports = contactsShema;
