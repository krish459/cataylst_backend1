const mongoose = require("mongoose");
const shortId = require("shortid");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

let blogSchema = new Schema(
  {
    img: {
      type: String,
    },
    postMeta: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    postDescriptions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.plugin(mongoosePaginate);

mongoose.models = {};

module.exports = mongoose.model("Blog", blogSchema);
