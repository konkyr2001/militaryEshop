const express = require("express");
router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

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
    currentPrice: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "white-shoe.png",
  });
  const product2 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    currentPrice: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "red-shoe.png",
  });
  const product3 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    oldPrice: "1160",
    currentPrice: "754",
    discount: "35",
    rating: "5",
    ratingAmount: "75",
    icon: "cyan-shoe.png",
  });
  const product4 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    currentPrice: "160",
    rating: "4",
    ratingAmount: "88",
    icon: "blue-shoe.png",
  });
  const product5 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    currentPrice: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "cyan-shoe.png",
  });
  const product6 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    oldPrice: "160",
    currentPrice: "104",
    rating: "5",
    discount: "35",
    ratingAmount: "75",
    icon: "blue-shoe.png",
  });
  const product7 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    currentPrice: "160",
    rating: "5",
    ratingAmount: "88",
    icon: "red-shoe.png",
  });
  const product8 = new Product({
    title: "HAVIT HV-G92 Gamepad",
    currentPrice: "160",
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
    res.status(201).json({ newUser1 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/bestSellers", async (req, res) => {
  try {
    const products = await Product.find().sort({
      bought: -1
    }).limit(4);
    res.status(201).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("creator", "email")
      .populate("ratings.userId", "email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/byIds", async (req, res) => {
  try {
    const { ids } = req.body;

    const products = await Product.find({ _id: { $in: ids } })
      .populate("creator", "email")
      .populate("ratings.userId", "email");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/create', async (req, res) => {
  try {
    const { createdProduct, userId } = req.body;
    const product = new Product(createdProduct);
    const newProduct = await product.save();
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { productsCreated: newProduct._id }
      });
    console.log("new Product: ", newProduct);
    res.status(201).json({ newProduct })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    await Product.findByIdAndDelete(productId);
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { productsCreated: productId }
      });
    res.status(200).json({ message: 'Product and user deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/ratedByUser', async (req, res) => {
  try {
    const { productsId } = req.body;
    const products = await Product.find({
      '_id': {
        $in: productsId
      }
    });
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});

router.post('/addRating', async (req, res) => {
  try {
    const { productId, userId, ratingInfo } = req.body;
    const product = await Product.findById(productId);
    let flag = false;
    for (const rating in product.ratings) {
      if (rating.userId == userId) {
        flag = true;
      }
    }
    if (flag) return;

    await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          ratings: {
            userId,
            rating: ratingInfo.rating,
            ratingText: ratingInfo.ratingText,
            date: ratingInfo.date
          }
        }
      }
    )
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          ratings: {
            productId,
            rating: ratingInfo.rating,
            ratingText: ratingInfo.ratingText,
            date: ratingInfo.date
          }
        }
      }
    )
    res.status(200).json({ message: 'Rating uploaded' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteRating', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { 'ratings': { userId } }
      }
    )
    await User.findByIdAndUpdate(
      userId, 
      {
        $pull: {'ratings': { productId }}
      }
    )
    res.status(200).json({ message: 'Product and user ratings deleted' })
    console.log(productId)
    console.log(userId)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
