const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            title: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
        },
    ],
    shippingCost: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    shippingLocation: {
        message: {
            type: String
        },
        lat: {
            type: Number
        },
        lon: {
            type: Number
        }
    }
}, {
    timestamps: true
});

checkoutSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model("checkout", checkoutSchema);
