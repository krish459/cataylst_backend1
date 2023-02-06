const mongoose = require("mongoose");
const shortId = require("shortid");

const Schema = mongoose.Schema;

let propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      //   required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    buyOrRent: {
      type: String,
      required: true,
    },
    details: [
  
      {
        bedrooms: Number,
        bathroom: Number,
        propertyType: String,
        propertyAge: Number,
        furnishing: String,
        tenants: Number,
        deposit: Number,
        foodPreferance: String,
        balcony: Number,
        flatFloor: Number,
        totalFloors: Number,
        availableFrom: Date,
        facing: String,
        monthlymaintenance: Number,
        waterSupply: Number,
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    flatOwner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    short: {
      type: String,
      required: true,
      default: shortId.generate,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

module.exports = mongoose.model("Property", propertySchema);
