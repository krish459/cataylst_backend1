const { Schema, model } = require("mongoose");
const { ROLES } = require("../utils/Enum");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: ROLES.CUSTOMER,
      enum: [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.BROKER, ROLES.CUSTOMER],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);
