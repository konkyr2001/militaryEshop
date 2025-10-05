const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
// const bcrypt = require("bcryptjs");

router.get("/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });
    console.log("get user by email: ", user);
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
      console.log(product);
      await product.save();
      console.log("add product save");
      user.favourites.push(productId);
      await user.save();
      console.log("add user save");
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "Product already on favourites",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/favourites/remove/:email", async (req, res) => {
  const email = req.params.email;
  const productId = req.body.productId;
  try {
    const user = await User.findOne({ email });
    console.log(user.favourites);
    console.log(productId);
    if (user.favourites.includes(productId)) {
      const product = await Product.findById({
        _id: productId,
      });
      product.likes = Number(product.likes) - 1;
      console.log(product);
      await product.save();
      console.log("remove product save");
      user.favourites.remove(productId);
      await user.save();
      console.log("remove user save");
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
      console.log("add user save");
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
    console.log(user);
    if (user.cart.includes(productId)) {
      user.cart.remove(productId);
      await user.save();
      console.log("add user save");
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "Product not found on cart",
      });
    }
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
    console.log("mpike");
    console.log(user);
    const newUser = await user.save();
    console.log(newUser);
    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
