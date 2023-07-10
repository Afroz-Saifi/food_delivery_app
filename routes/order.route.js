const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { Restaurant } = require("../models/restaurant.model");
const { Order } = require("../models/order.model");

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  const { resId, itemId, quantity } = req.query;
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwt.decode(token, process.env.access_token);
    if (!decoded) {
      throw new Error("Authnetication error!, please login first");
    }
    const { _id } = decoded;
    const item = await Restaurant.findOne({
      _id: resId,
      "menu._id": itemId,
    });
    if (!item) {
      throw new Error("this item is not available.");
      return;
    }
    const orderItem = item.menu.find((ele) => ele._id == itemId);
    console.log(decoded);
    const userData = await User.findById(_id);
    const newOrder = {
      user: _id,
      restaurant: resId,
      items: [
        {
          name: orderItem.name,
          price: orderItem.price,
          quantity,
        },
      ],
      totalPrice: quantity * orderItem.price,
      deliveryAddress: userData.address,
    };
    const saveOrder = new Order(newOrder)
    await saveOrder.save();
    return res.status(201).json({
        error: false,
        message: "ordered succeessfully"
    })
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// get order details
orderRouter.get("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const data = await Order.findById(id)
        if(!data){
            throw new Error("order not found")
            return;
        }
        return res.status(200).json({
            error: false,
            message: "your order details",
            order: data
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message,
          });
    }
})

// update order status
orderRouter.patch("/:id", async (req, res) => {
    const {id} = req.params
    const {newStatus} = req.query
    try {
        const data = await Order.findById(id)
        if(!data){
            throw new Error("order not found")
            return;
        }
        await Order.findByIdAndUpdate(id, {...data, status: newStatus})
        return res.status(200).json({
            error: false,
            message: "status update successfully",
            newStatus
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message,
          });
    }
})

module.exports = { orderRouter };
