const express = require("express");
router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/defaults", async (req, res) => {
  const product1 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "white-shoe.png",
  });
  const product2 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "red-shoe.png",
  });
  const product3 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "1160",
    discount: "35",
    rating: "5",
    ratingAmount: "75",
    icon: "cyan-shoe.png",
  });
  const product4 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "4",
    ratingAmount: "88",
    icon: "blue-shoe.png",
  });
  const product5 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "cyan-shoe.png",
  });
  const product6 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "5",
    discount: "35",
    ratingAmount: "75",
    icon: "blue-shoe.png",
  });
  const product7 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "red-shoe.png",
  });
  const product8 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    money: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "white-shoe.png",
  });

  try {
    const newUser1 = await product1.save();
    const newUser2 = await product2.save();
    const newUser3 = await product3.save();
    const newUser4 = await product4.save();
    const newUser5 = await product5.save();
    const newUser6 = await product6.save();
    const newUser7 = await product7.save();
    const newUser8 = await product8.save();
    console.log(newUser1);
    res.status(201).json({ newUser1 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
