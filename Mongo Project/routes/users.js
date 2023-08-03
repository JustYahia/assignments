const express = require("express");
const router = express.Router();
const User = require("../models/users");


function errorHandler(res, status, message) {
  return res.status(status).json({ error: message });
}

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    errorHandler(res, 400, "Failed to create a new user.");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    errorHandler(res, 500, "Failed to fetch users.");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return errorHandler(res, 404, "User not found.");
    res.json(user);
  } catch (error) {
    errorHandler(res, 404, "User not found.");
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) return errorHandler(res, 404, "User not found.");
    res.json(user);
  } catch (error) {
    errorHandler(res, 404, "User not found.");
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return errorHandler(res, 404, "User not found.");
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    errorHandler(res, 404, "User not found.");
  }
});

module.exports = router;
