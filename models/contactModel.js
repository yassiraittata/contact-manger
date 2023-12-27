const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name."],
    },
    email: {
      type: String,
      required: [true, "Please add a valid email address."],
    },
    phone: {
      type: String,
      required: [true, "Please add a valid phone number."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contact", contactSchema);
