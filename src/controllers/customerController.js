const Customer = require("../models/customerModel");
const ErrorHandler = require("../middlewares/errorHandler/errorHandlingClass");

exports.createCustomer = async (req, res, next) => {
  const customer = await Customer.create(req.body);
  return res.status(201).send({ status: true, data: customer });
};

exports.getAllCustomers = async (req, res, next) => {
  const customerList = await Customer.find({ status: "ACTIVE" });
  if (customerList.length === 0) {
    return next(new ErrorHandler(404, "No customer found with ACTIVE status"));
  }
  return res.status(200).send({ status: true, data: customerList });
};

exports.deleteCustomer = async (req, res, next) => {
  const customer = await Customer.findOneAndDelete({
    customerID: req.params.customerID,
    status: "INACTIVE",
  });
  if (!customer) {
    return next(
      new ErrorHandler(
        404,
        "No customer found with this ID and status INACTIVE"
      )
    );
  }
  return res.status(204).send("Customer deleted successfully");
};
