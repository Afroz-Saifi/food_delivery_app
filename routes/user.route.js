const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { Restaurant } = require("../models/restaurant.model");
const { Order } = require("../models/order.model");

const userRouter = express.Router();

// register new user
userRouter.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const { email } = payload;
    const isUser = await User.findOne({ email });
    if (isUser) {
      throw new Error("user already present");
      return;
    }
    const { password } = payload;
    const hash = bcrypt.hashSync(password, 8);
    const userData = new User({ ...payload, password: hash });
    await userData.save();
    return res.status(201).json({
      error: false,
      message: "User registered successfully",
      newUser: userData,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// login route
userRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      throw new Error("User not found. Please register first!");
      return;
    }
    const isPass = bcrypt.compareSync(password, isUser.password);
    if (!isPass) {
      throw new Error("Wrong credentials");
      return;
    }
    const { name, _id } = isUser;
    const token = jwt.sign({ name, email, _id }, process.env.access_token, {
      expiresIn: "1h",
    });
    return res.status(201).json({
      error: false,
      message: "User login successfull",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// reset password route
userRouter.patch("/user/:id/reset", async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const {id} = req.params
  try {
    const userData = await User.findById(id)
    if(!userData){
        throw new Error("User not found");
        return;
    }
    const {password} = userData;
    console.log(password);
    const isPass = bcrypt.compareSync(`${oldPassword}`, password);
    if (!isPass) {
      throw new Error("Wrong password");
      return;
    }
    const hash = bcrypt.hashSync(newPassword, 8);
    await User.findByIdAndUpdate(id, {password: hash})
    return res.status(204).json({
        error: false,
        message: "Password reset success",
    })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});
module.exports = { userRouter };
