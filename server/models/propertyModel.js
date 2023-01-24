const mongoose = require("mongoose");

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
    flatOwner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

module.exports = mongoose.model("Property", propertySchema);
