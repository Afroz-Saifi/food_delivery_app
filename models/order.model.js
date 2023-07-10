const mongoose = require("mongoose");

const order_schema = new mongoose.Schema({
    user : { type: String, ref: 'User' },
    restaurant : { type: String, ref: 'Restaurant' },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: {type: String, default: "placed"} // e.g, "placed", "preparing", "on the way", "delivered"
});

const Order = mongoose.model("order", order_schema);

module.exports = { Order };