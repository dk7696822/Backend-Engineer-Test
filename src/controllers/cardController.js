const Card = require("../models/cardModel");
const ErrorHandler = require("../middlewares/errorHandler/errorHandlingClass");
const Customer = require("../models/customerModel");

exports.createCard = async (req, res, next) => {
  if (!req.body.customerID) {
    return next(new ErrorHandler(400, "Please provide customer ID"));
  }
  const customer = await Customer.findOne({ customerID: req.body.customerID });

  if (!customer) {
    return next(new ErrorHandler(404, "No customer matched with this ID"));
  }
  const card = await Card.find();
  if (card.length === 0) {
    req.body.cardNumber = "C001";
    req.body.customerName = `${customer.firstName} ${customer.lastName}`;
    req.body.cardType = "REGULAR";
    req.body.status = "ACTIVE";
    const newCard = await Card.create(req.body);
    return res.status(201).send({ status: true, data: newCard });
  }
  const cardNumber = card.length + 1;
  if (cardNumber < 10) {
    req.body.cardNumber = `C00${cardNumber}`;
  } else if (cardNumber > 9 && cardNumber < 100) {
    req.body.cardNumber = `C0${cardNumber}`;
  } else {
    req.body.cardNumber = `C${cardNumber}`;
  }
  req.body.customerName = `${customer.firstName} ${customer.lastName}`;
  req.body.cardType = "REGULAR";
  req.body.status = "ACTIVE";
  const newCard = await Card.create(req.body);
  return res.status(201).send({ status: true, data: newCard });
};

exports.getAllCards = async (req, res, next) => {
  const cards = await Card.find();
  return res.status(200).send({ status: true, data: cards });
};
