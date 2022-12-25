const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: [true, "Please provide your card Number"],
    },
    cardType: {
      type: String,
      default: "REGULAR",
      trim: true,
      enum: {
        values: ["REGULAR", "SPECIAL"],
        message: "Card type can only be regular or special",
      },
    },
    customerName: {
      type: String,
      required: [true, "Please provide your name"],
    },

    vision: { type: String },
    customerID: {
      type: String,
      ref: "customer",
      required: [true, "Please provide customer ID"],
      unique: true,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: {
        values: ["ACTIVE", "INACTIVE"],
        message: "Status can only be ACTIVE or INACTIVE",
      },
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Card", cardSchema);
