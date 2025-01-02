const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/login/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post("/signup", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    console.log(newUser);
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
