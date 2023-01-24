const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let propertyModel = new Schema(
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
      required: true,
    },
    area: {
      type: String,
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
    details: [
      {
        bedrooms: Number,
        bathroom: Number,
        listingType: String,
        propertyType: String,
        propertyAge: Number,
        furnishing: String,
        tenants: Number,
        deposit: String,
        foodPreferance: String,
        builtUpArea: Number,
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
    person: [
      {
        name: String,
        email: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("properties", propertyModel);

module.exports = model;
