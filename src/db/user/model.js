const { hash } = require("bcrypt");
const mongoose = require("mongoose");

const Shema = mongoose.Schema;

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
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userShema.pre("save", async function () {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
});

module.exports = userShema;
