const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { Restaurant } = require("../models/restaurant.model");
const { Order } = require("../models/order.model");

const restaurantRouter = express.Router();

// post route for new restaurants
restaurantRouter.post("/", async (req, res) => {
    const data = new Restaurant(req.body)
    await data.save()
    res.send("added restu")
})

// get all restaurants
restaurantRouter.get("/", async (req, res) => {
  try {
    const data = await Restaurant.find();
    if (data.length == 0) {
      throw new Error("no restaurants found");
      return;
    }
    return res.status(200).json({
      error: false,
      messages: "all available restaurants",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// get restaurant by id
restaurantRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Restaurant.findById(id);
    if (!data) {
      throw new Error("no restaurants found");
      return;
    }
    return res.status(200).json({
      error: false,
      messages: "Available restaurant",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// get restaurant menu by its id
restaurantRouter.get("/:id/menu", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Restaurant.findById(id);
    if (!data) {
      throw new Error("restaurant not available");
      return;
    }
    return res.status(200).json({
      error: false,
      message: "restaurant menu",
      menu: data.menu,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// update restaurant menu by its id
restaurantRouter.put("/:id/menu", async (req, res) => {
  const { id } = req.params;
  const newMenu = req.body;
  try {
    const data = await Restaurant.findById(id);
    if (!data) {
      throw new Error("restaurant not available");
      return;
    }
    await Restaurant.findByIdAndUpdate(id, { $push: { menu: newMenu } });
    return res.status(201).json({
      error: false,
      message: "new menu added",
      newMenu,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

// delete restaurant menu item by its id
restaurantRouter.delete("/:id/menu/:id2", async (req, res) => {
  const { id, id2 } = req.params;
  try {
    const data = await Restaurant.findById(id);
    if (!data) {
      throw new Error("restaurant not available");
      return;
    }
    const deletedMenu = await Restaurant.findByIdAndUpdate(id, { $pull: { menu: { _id: id2 } } });
    return res.status(202).json({
      error: false,
      message: "menu deleted success"
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = { restaurantRouter };
