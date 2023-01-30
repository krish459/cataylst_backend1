const { userAuth, checkRole } = require("../utils/Auth");
const Property = require("../models/propertyModel");
const express = require("express");
const router = express.Router();

const { z, ZodError } = require("zod");
const { saveData } = require("../utils/Zodcheck");

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.get(
  "/get-properties",
  // userAuth,
  // checkRole(["admin"]),
  async (req, res) => {
    try {
      let query = {};
      if (req.query.buyOrRent) {
        query.buyOrRent = req.query.buyOrRent;
      }
      // if (req.query.bathroom) {
      //   query.details[0].bathroom == parseInt(req.query.bathroom);
      // }
      // if (req.query.bedrooms) {
      //   // query.details[0].bedrooms == parseInt(req.query.bedrooms);
      //   console.log(query.details[0].bedrooms);
      // }
      if (req.query.keyword) {
        query.$or = [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { description: { $regex: req.query.keyword, $options: "i" } },
          { locality: { $regex: req.query.keyword, $options: "i" } },
          { state: { $regex: req.query.keyword, $options: "i" } },
          // {
          //   "details[0].bedrooms": {
          //     $lt: req.query.bedrooms,
          //   },
          // },
        ];
      }
      let properties = await Property.find(query).populate("flatOwner", "name");
      details = [];
      if (Object.keys(req.query).length != 0) {
        properties.forEach((element) => {
          if (
            (parseInt(req.query.bedrooms) >= 6
              ? element.details[0].bedrooms >= parseInt(req.query.bedrooms)
              : element.details[0].bedrooms == parseInt(req.query.bedrooms)) ||
            (parseInt(req.query.bathroom) >= 3
              ? element.details[0].bathroom >= parseInt(req.query.bathroom)
              : element.details[0].bathroom == parseInt(req.query.bathroom)) ||
            (parseInt(req.query.propertyAge) >= 3
              ? element.details[0].propertyAge >=
                parseInt(req.query.propertyAge)
              : element.details[0].propertyAge ==
                parseInt(req.query.propertyAge)) ||
            element.details[0].furnishing == req.query.furnishing ||
            (parseInt(req.query.tenants) >= 3
              ? element.details[0].tenants >= parseInt(req.query.tenants)
              : element.details[0].tenants == parseInt(req.query.tenants)) ||
            (parseInt(req.query.deposit) >= 10000
              ? element.details[0].deposit >= parseInt(req.query.deposit)
              : element.details[0].deposit == parseInt(req.query.deposit)) ||
            element.details[0].foodPreferance == req.query.foodPreferance ||
            (parseInt(req.query.flatFloor) >= 3
              ? element.details[0].flatFloor >= parseInt(req.query.flatFloor)
              : element.details[0].flatFloor ==
                parseInt(req.query.flatFloor)) ||
            (parseInt(req.query.totalFloors) >= 10000
              ? element.details[0].totalFloors >=
                parseInt(req.query.totalFloors)
              : element.details[0].totalFloors ==
                parseInt(req.query.totalFloors)) ||
            element.details[0].facing == req.query.facing ||
            (parseInt(req.query.monthlymaintenance) >= 3
              ? element.details[0].monthlymaintenance >=
                parseInt(req.query.monthlymaintenance)
              : element.details[0].monthlymaintenance ==
                parseInt(req.query.monthlymaintenance)) ||
            (parseInt(req.query.waterSupply) >= 10000
              ? element.details[0].waterSupply >=
                parseInt(req.query.waterSupply)
              : element.details[0].waterSupply ==
                parseInt(req.query.waterSupply)) ||
            element.amenities.includes(req.query.amenities) ||
            (parseInt(req.query.availableFromYear) >= 2026
              ? element.details[0].availableFrom.getFullYear().toString() >=
                parseInt(req.query.availableFromYear)
              : element.details[0].availableFrom.getFullYear().toString() ==
                parseInt(req.query.availableFromYear))
          ) {
            details.push(element);
          }
        });
        res.status(200).json({ details });
      } else {
        res.status(200).json({ properties });
      }
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  }
);

router.post("/add-properties", async (req, res) => {
  const {
    title,
    description,
    images,
    area,
    locality,
    state,
    rent,
    buyOrRent,
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
    buyOrRent,
    details,
    amenities,
    flatOwner,
  });
  try {
    const result = await saveData(User1, req.body);
    if (result.success) {
      newItem.save();
      res.send(`Item added successfully : ${newItem}`);
    } else {
      return res.status(400).json({ message: "Invalid Input" });
    }
  } catch (error) {
    // return res.status(200).json({ result });
    return res.status(400).json({ message: error });
  }
});

router.get("/get-properties/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Property.findById(id);
    // const product = await Property.findOne({ _id: id });

    res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get("/:shortUrl", async (req, res) => {
  // console.log(req.params.shortUrl);
  try {
    const product = await Property.findOne({ short: req.params.shortUrl });
    console.log(product);

    res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

const details1 = z.object({
  bedrooms: z.number(),
  bathroom: z.number(),
  propertyType: z.string(),
  propertyAge: z.number().positive(),
  furnishing: z.enum(["full", "partially", "not"]),
  tenants: z.number().positive(),
  deposit: z.number().positive(),
  foodPreferance: z.string(),
  balcony: z.number(),
  flatFloor: z.number(),
  totalFloors: z.number().positive(),
  availableFrom: z.string(),
  facing: z.string(),
  monthlymaintenance: z.number().positive(),
  waterSupply: z.number().positive(),
});
const User1 = z.object({
  title: z.string(),
  description: z.string(),
  // images:z.string().url(),
  images: z.string(),
  area: z.number().positive(),
  locality: z.string(),
  state: z.string(),
  rent: z.number().positive(),
  buyOrRent: z.enum(["buy", "rent"]),
  details: z.array(details1),
  flatOwner: z.string(),
});

module.exports = router;
