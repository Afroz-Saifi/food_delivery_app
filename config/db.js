const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = mongoose.connect(process.env.MONGO_URL);

module.exports = { connectDb };
