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
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number
      },
      ratingText: {
        type: String
      },
      date: {
        type: Date
      }
    },
  ],
  ratingsCounter: {
    type: Number,
    default: 0,
  },
  ratingsSum: {
    type: Number,
    default: 0,
  },
  icon: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    }
  },
  bought: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
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
