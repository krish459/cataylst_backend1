const { userAuth, checkRole } = require("../utils/Auth");
const Property = require("../models/propertyModel");
const express = require("express");
const router = express.Router();

const { z, ZodError } = require("zod");
const { saveData } = require("../utils/Zodcheck");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream, generateUploadURL } = require("../s3");

/**
 * @swagger
 * /api/property/s3Url:
 *  get:
 *    summary: To get pre signed url
 *    tags: [Images]
 *    description: This api is used to send presigned url
 *    responses:
 *        200:
 *            description: This api is used send presigned url
 *
 */

// generates signed url
router.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  res.status(200).send({ url });
});

// code in frontend to directly store the image
//   const {url} = await fetch('').then(res=>res.json())
//   console.log(url)
//   await fetch(url,{
//     method: "PUT",
//     headers:{
//       "Content_Type":"multipart/form-data"
//     },
//     body: file
//   })
// })
// const imageUrl = url.split('?')[0]
// console.log(imageUrl)

/**
 * @swagger
 * /api/property/images/{key}:
 *  get:
 *    summary: To get image by key
 *    tags: [Images]
 *    parameters:
 *      - in: path
 *        name: key
 *        schema:
 *          type: string
 *        required: true
 *        description: The image key
 *    responses:
 *        200:
 *          description: The image desc by key
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Property'
 *        400:
 *          description: The image not found
 */

// to get images from the backend
router.get("/images/:key", (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
    res.status(200);
  } catch (error) {
    console.log(`Error : ${error}`);
    res.status(400);
  }
});

/**
 * @swagger
 * tags:
 *    name: Images
 *    description: The Images managing API
 */

// router.post("/single-image", upload.single("image"), async (req, res) => {
//   try {
//     const file = req.file;
//     console.log(file);
//     const resultImage = await uploadFile(file);
//     // console.log(resultImage.Key);
//     res.send(resultImage);
//   } catch (error) {}
// });

/**
 * @swagger
 * /api/property/multiple-image:
 *      post:
 *        summary: Add multiple images to s3
 *        tags: [Images]
 *        requestBody:
 *          content:
 *            multipart/form-data:
 *              schema:
 *                type: object
 *                properties:
 *                  images:
 *                    type: array
 *                    items:
 *                      type: string
 *                      format: binary
 *        responses:
 *          200:
 *            description: The images were uploaded
 *          400:
 *            description: Image not uploaded
 */

router.post("/multiple-image", upload.array("images", 3), async (req, res) => {
  try {
    // const file = req.files;
    // console.log(req.files);
    let imgkeys = []
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const resultImage = await uploadFile(req.files[i]);
        console.log(`Image ${i} - ${resultImage.Key}`);
        imgkeys.push(resultImage.Key)
      }
    }

    res.status(200).json({
      message: ` ${req.files.length} Images uploaded succefully. imgkeys: ${imgkeys}`,
    });
  } catch (error) {
    res.status(400).json({
      message: `Image not uploaded : ${error} `,
    });
  }
});

/**
 * @swagger
 * components:
 *    schemas:
 *      Property:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - area
 *          - locality
 *          - state
 *          - rent
 *          - buyOrRent
 *          - details
 *          - amenities
 *          - flatowner
 *          - short
 *        properties:
 *                title:
 *                    type: String
 *                description:
 *                     type: String
 *                images:
 *                     type: String
 *                area:
 *                     type: Number
 *                locality:
 *                     type: String
 *                state:
 *                     type: String
 *                rent:
 *                     type: Number
 *                buyOrRent:
 *                     type: String
 *                details:
 *                      type: Array
 *                      items:
 *                          bedrooms:
 *                                  type: Number
 *                          bathroom:
 *                                  type: Number
 *                          propertyType:
 *                                  type: String
 *                          propertyAge:
 *                                  type: Number
 *                          furnishing:
 *                                  type: String
 *                          tenants:
 *                                  type: Number
 *                          deposit:
 *                                  type: Number
 *                          foodPreferance:
 *                                  type: String
 *                          balcony:
 *                                  type: Number
 *                          flatFloor:
 *                                  type: Number
 *                          totalFloors:
 *                                  type: Number
 *                          availableFrom:
 *                                  type: Date
 *                          facing:
 *                                  type: String
 *                          monthlymaintenance:
 *                                  type: Number
 *                          waterSupply:
 *                                  type: Number
 *                amentities:
 *                     type: Array
 *                     items:
 *                          type: string
 *                flatOwner:
 *                     type: string
 *                short:
 *                     type: string
 *
 */

/**
 * @swagger
 * tags:
 *    name: Properties
 *    description: The Property managing API
 */

/**
 * @swagger
 * /api/property/get-properties:
 *  get:
 *    summary: To get all properties from mongo DB
 *    tags: [Properties]
 *    description: This api is used to fetchdata from mongoDB
 *    responses:
 *        200:
 *            description: This api is used to fetchdata from mongoDB
 *            content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                        $ref: '#/components/schemas/Property'
 */
router.get(
  "/get-properties",
  // userAuth,
  // checkRole(["admin"]),
  async (req, res) => {
    try {
      let query = {};
        if (req.query.keyword) {
            query.$or = [
                { title: { $regex: req.query.keyword, $options: "i" } },
                { description: { $regex: req.query.keyword, $options: "i" } },
                { locality: { $regex: req.query.keyword, $options: "i" } },
                { state: { $regex: req.query.keyword, $options: "i" } },
              ];
            }
            let properties = await Property.find(query).populate("flatOwner", "name");
            
            let details = [];
      if (Object.keys(req.query).length != 0 && !req.query.keyword) {
        properties.forEach((element) => {

          if (
            (element.locality == req.query.locality)||
            (element.buyOrRent == req.query.buyOrRent)||
            (element.area >= parseInt(req.query.minarea) )||
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
            element.details[0].propertyType == req.query.propertyType ||
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

/**
 * @swagger
 * /api/property/add-properties:
 *  post:
 *    summary: Create a new property
 *    tags: [Properties]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Property'
 *    responses:
 *      200:
 *        description: The property was created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Property'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: The property was not created
 *
 *
 */

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
    return res.status(404).json({ message: error });
  }
});

/**
 * @swagger
 * /api/property/get-properties/{id}:
 *  get:
 *    summary: To get property by id
 *    tags: [Properties]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The property id
 *    responses:
 *        200:
 *          description: The property desc by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Property'
 *        400:
 *          description: The property not found
 */

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

/**
 * @swagger
 * /api/property/{shortUrl}:
 *  get:
 *    summary: To get property by short url
 *    tags: [Properties]
 *    parameters:
 *      - in: path
 *        name: shortUrl
 *        schema:
 *          type: string
 *        required: true
 *        description: The property shortUrl
 *    responses:
 *        200:
 *          description: The property desc by shortUrl
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Property'
 *        400:
 *          description: The property not found
 */

router.get("/:shortUrl", async (req, res) => {
  // console.log(req.params.shortUrl);
  try {
    const product = await Property.findOne({ short: req.params.shortUrl });
    // console.log(product);

    res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// changing string to number
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
  // images: z.string(),
  area: z.number().positive(),
  locality: z.string(),
  state: z.string(),
  rent: z.number().positive(),
  buyOrRent: z.enum(["buy", "rent"]),
  details: z.array(details1),
  flatOwner: z.string(),
});

module.exports = router;
