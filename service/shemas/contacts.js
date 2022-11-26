const mongoose = require("mongoose");
const { handleError } = require("../../errors/hendleErrorShema");

const Shema = mongoose.Schema;

const contactsShema = new Shema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: false,
    },
    phone: {
      type: String,
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
contactsShema.post("save", handleError);

module.exports = { contactsShema };
