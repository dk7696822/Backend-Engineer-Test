const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  deleteCustomer,
} = require("../controllers/customerController");
const {
  authentication,
  authorisation,
} = require("../controllers/authController");
const { createCard, getAllCards } = require("../controllers/cardController");

const router = express.Router();
// eslint-disable-next-line arrow-body-style
const use = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

router.post("/customer", use(createCustomer));
router.get(
  "/customer/:customerID?",
  authentication,
  authorisation,
  use(getAllCustomers)
);
router.delete(
  '/customer/:customerID?"',
  authentication,
  authorisation,
  use(deleteCustomer)
);
router.post("/card", use(createCard));
router.get(
  "/card/:customerID",
  authentication,
  authorisation,
  use(getAllCards)
);
module.exports = router;
