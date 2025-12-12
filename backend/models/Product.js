const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  oldPrice: {
    type: Number,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
  },
  rating: {
    type: String,
    required: true,
  },
  ratingAmount: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

productSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Product", productSchema);
