const express = require("express");
router = express.Router();
const Checkout = require("../models/Checkout");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    console.log("mpike");
    const ids = req.query.ids;
    const checkouts = await Promise.all(
      ids.map(id => Checkout.findById({ _id: id }))
    );
    console.log("checkouts: ", checkouts);
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  const checkoutParam = req.body.checkout;
  console.log('checkoutParam: ', checkoutParam)
  const checkout = new Checkout(checkoutParam);
  console.log('checkout: ', checkout)
  try {
    const newCheckout = await checkout.save();
    for (const item of checkoutParam.items) {
      await Product.findByIdAndUpdate(
        item.id, 
        { $inc: { bought: item.quantity }}
      );
    };
    console.log('newCheckout: ', newCheckout)
    res.status(201).json({ checkout });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
