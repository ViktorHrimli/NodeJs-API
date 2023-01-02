const mongoose = require("mongoose");
const { ConflicktError } = require("../../helpers/ApiHandleError");

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
  { versionKey: false }
);

// FIXME crashed app, this error not captured
contactsShema.post("save", async function (err, data, next) {
  if (err.name === "MongoServerError" && err.code === 11000) {
    return next(new ConflicktError(err.message));
  }
  next();
});
module.exports = contactsShema;
