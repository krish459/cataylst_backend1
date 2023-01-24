const { userAuth, checkRole } = require("../utils/Auth");
const Property = require("../models/propertyModel");
const express = require("express");
const router = express.Router();

router.get(
  "/get-properties",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    try {
      let properties = await Property.find().populate("flatOwner", "name");

      res.status(200).json({ properties });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);

router.post(
  "/add-properties",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    const {
      title,
      description,
      images,
      area,
      locality,
      state,
      rent,
      details,
      amenities,
      flatOwner,
    } = req.body;

    const newItem = new Property({
      title,
      description,
      images,
      area,
      locality,
      state,
      rent,
      details,
      amenities,
      flatOwner,
    });
    try {
      newItem.save();
      res.send(`Item added successfully : ${newItem}`);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);

module.exports = router;
