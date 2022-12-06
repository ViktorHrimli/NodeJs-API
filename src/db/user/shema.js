const mongoose = require("mongoose");

const Shema = mongoose.Schema;

const userShema = new Shema({
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
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },

  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

module.exports = userShema;
