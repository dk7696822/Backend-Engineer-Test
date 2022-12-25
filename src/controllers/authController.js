const Card = require("../models/cardModel");
const Customer = require("../models/customerModel");
const ErrorHandler = require("../middlewares/errorHandler/errorHandlingClass");

exports.authentication = async (req, res, next) => {
  if (!req.params.customerID) {
    return next(
      new ErrorHandler(400, "Please provide your customer ID in url")
    );
  }
  if (!req.body.emailID) {
    return next(
      new ErrorHandler(
        400,
        "Email ID is compulsary, please provide your email ID"
      )
    );
  }
  const customer = await Customer.findOne({
    customerID: req.params.customerID,
    emailID: req.body.emailID,
  });
  if (!customer) {
    return next(new ErrorHandler(401, "Email ID or customer ID is incorrect"));
  }
  next();
};
exports.authorisation = async (req, res, next) => {
  const card = await Card.findOne({
    customerID: req.params.customerID,
    cardType: "SPECIAL",
  });
  if (!card) {
    return next(
      new ErrorHandler(403, "You are not authorised to perform this action")
    );
  }
  next();
};
