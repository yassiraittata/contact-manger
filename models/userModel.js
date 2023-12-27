const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is a mandatory!"],
    },

    email: {
      type: String,
      required: [true, "Email is a mandatory!"],
      unique: [true, "Email already taken!"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  { timestamps: true }
);

module.exports = model("Users", userSchema);
