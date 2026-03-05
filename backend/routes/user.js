const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
// const bcrypt = require("bcryptjs");

router.get("/email/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/id/:id", async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await User.findById({ 
      _id: userID
     });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/products", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId)
      .populate("productsCreated");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/updateUser", async (req, res) => {
  const { oldUser, newUser } = req.body;
  const user = await User.findOne({ email: oldUser.email });
  if (newUser.email) {
    user.email = newUser.email;
  }
  if (newUser.password) {
    user.password = newUser.password;
  }
  await user.save();
  return res.status(200).json(user);
});

router.put("/favourites/add/:email", async (req, res) => {
  const email = req.params.email;
  const productId = req.body.productId;

  try {
    const user = await User.findOne({ email });
    if (!user.favourites.includes(productId)) {
      const product = await Product.findById({
        _id: productId,
      });
      product.likes = Number(product.likes) + 1;
      await product.save();
      user.favourites.push(productId);
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "Product already on favourites",
      });
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});

router.put("/favourites/remove/:email", async (req, res) => {
  const email = req.params.email;
  const productId = req.body.productId;
  try {
    const user = await User.findOne({ email });
    if (user.favourites.includes(productId)) {
      const product = await Product.findById({
        _id: productId,
      });
      product.likes = Number(product.likes) - 1;
      await product.save();
      user.favourites.remove(productId);
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "Product not found on favourites",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/cart/add/:email", async (req, res) => {
  const email = req.params.email;
  const productId = req.body.productId;

  try {
    const user = await User.findOne({ email });
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "Product already on cart",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/cart/remove/:email", async (req, res) => {
  const email = req.params.email;
  const productId = req.body.productId;
  try {
    const user = await User.findOne({ email });
      user.cart.remove(productId);
      await user.save();
      return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/checkout/:id", async (req, res) => {
  const userID = req.params.id;
  const checkoutID = req.body.checkoutID;
  try {
    const user = await User.findById({
      _id: userID
    });
    if (!user.checkouts.includes(checkoutID)) {
      user.checkouts.push(checkoutID);
      user.cart = [];
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "Product not found on cart",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
