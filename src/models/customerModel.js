const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
      trim: true,
    },
    emailID: {
      type: String,
      required: [true, "Please provide your email-ID"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: [true, "Please provide your mobile number"],
      unique: true,
      validate: {
        validator: function (val) {
          // eslint-disable-next-line no-return-assign
          const valid = /^[6-9]\d{9}$/;
          return valid.test(val);
        },
        message: "Please provide valid Mobile number",
      },
      trim: true,
    },
    DOB: {
      type: Date,
      required: [true, "Please provide the password"],
    },
    address: { type: String, required: [true, "Please provide address"] },
    customerID: {
      type: String,
      required: [true, "Please provide customer ID"],
      validate: [validator.isUUID, "Please provide a valid UUID"],
      unique: true,
    },
    status: {
      type: String,
      default: "ACTIVE",
      trim: true,
      enum: {
        values: ["ACTIVE", "INACTIVE"],
        message: "Status can only be ACTIVE or INACTIVE",
      },
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("customer", customerSchema);
