const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: {type: String, default: "India"},
    zip: String,
  },
});

const User = mongoose.model("user", user_schema);

module.exports = { User };
