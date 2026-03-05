const express = require("express");
router = express.Router();
const Checkout = require("../models/Checkout");
const Product = require("../models/Product");

router.post("/getCheckouts", async (req, res) => {
  try {
    const { ids } = req.body;
    const checkoutArr = [];
    for (const id of ids) {
      const checkout = await Checkout.findById(id);
      if (checkout) {
        checkoutArr.push(checkout);
      }
    }
    res.status(200).json(checkoutArr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  const checkoutParam = req.body.checkout;
  const checkout = new Checkout(checkoutParam);
  try {
    const newCheckout = await checkout.save();
    for (const item of checkoutParam.items) {
      await Product.findByIdAndUpdate(
        item.id, 
        { $inc: { bought: item.quantity }}
      );
    };
    res.status(201).json({ checkout });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
