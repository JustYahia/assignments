const express = require("express");
const router = express.Router();
const Product = require("../models/products");


router.post("/", async (req, res) => {
  try {
    const { title, number_of_stocks, rating, price } = req.body;
    const product = await Product.create({ title, number_of_stocks, rating, price });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create a new product." });
  }
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});


router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product." });
  }
});


router.patch("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the product." });
  }
});


router.delete("/:productId", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product." });
  }
});

module.exports = router;
