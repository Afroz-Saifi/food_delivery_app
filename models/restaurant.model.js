const mongoose = require("mongoose");

const restaurant_schema = new mongoose.Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: {type: String, default: "India"},
    zip: String,
  },
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  ],
});

const Restaurant = mongoose.model("restaurant", restaurant_schema);

module.exports = { Restaurant };
