
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required."],
  },
  number_of_stocks: {
    type: Number,
    required: [true, "Number of stocks is required."],
    min: [0, "Number of stocks must be non-negative."],
  },
  rating: {
    type: Number,
    required: [true, "Product rating is required."],
    min: [0, "Rating must be non-negative."],
    max: [5, "Rating can't be more than 5."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
    min: [0, "Price must be non-negative."],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
