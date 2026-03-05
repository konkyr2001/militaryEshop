const express = require("express");
router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const { PutObjectCommand, S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const upload = multer();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      .populate("ratings.user", "email");
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
      .populate("ratings.user", "email");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/create', upload.single('file'), async (req, res) => {
  try {
    const { userId, iconName, ...createdProduct } = req.body;
    const file = req.file;
    const accessKeyId = process.env.S3_ACCESS_KEY;
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.S3_BUCKET_REGION;

    const s3 = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      region
    });

    const fileKey = `upload/${uuidv4()}_${iconName}`;
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;

    createdProduct.icon = {
      name: iconName,
      url: s3Url,
      key: fileKey,
    };

    const product = new Product(createdProduct);
    const newProduct = await product.save();
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { productsCreated: newProduct._id }
      });
    res.status(201).json({ newProduct })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const product = await Product.findByIdAndDelete(productId);
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { productsCreated: productId }
      });

    const accessKeyId = process.env.S3_ACCESS_KEY;
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.S3_BUCKET_REGION;

    const s3 = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      region
    });
    await s3.send(new DeleteObjectCommand({
      Bucket: bucket,
      Key: product.icon.key,
    }));
    res.status(200).json({ message: 'Product and user deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/ratedByUser', async (req, res) => {
  try {
    const { productsId } = req.body;
    const products = await Product.find({
      _id: {
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

    const ratingCreated = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          ratings: {
            user: userId,
            rating: ratingInfo.rating,
            ratingText: ratingInfo.ratingText,
            date: ratingInfo.date
          }
        },
        $inc: {
          ratingsSum: ratingInfo.rating,
          ratingsCounter: 1
        }
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          ratings: {
            product: productId,
            rating: ratingInfo.rating,
            ratingText: ratingInfo.ratingText,
            date: ratingInfo.date
          }
        }
      }
    )
    const index = ratingCreated.ratings.at(-1);
    res.status(200).json({
      data: {
        userId,
        rating: ratingInfo.rating,
        ratingText: ratingInfo.ratingText,
        date: ratingInfo.date,
        _id: index._id
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteRating', async (req, res) => {
  try {
    const { productId, reviewRating, userId } = req.body;
    await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { 'ratings': { user: userId } },
        $inc: {
          ratingsSum: -reviewRating,
          ratingsCounter: -1
        }
      }
    )
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { 'ratings': { product: productId } },
      }
    )
    res.status(200).json({ message: 'Product and user ratings deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
