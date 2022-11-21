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
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const handleError = (error, data, next) => {
  console.log(error);
  const { code } = error;
  if (!code) {
    error.status = 400;
  }
  next();
};
contactsShema.post("save", handleError);

module.exports = { contactsShema };
