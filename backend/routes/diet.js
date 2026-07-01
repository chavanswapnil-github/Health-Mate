const express = require("express");
const router = express.Router();
const DietEntry = require("../models/DietEntry");
const jwt = require("jsonwebtoken");

// middleware to check user token
const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// GET user's diet history
router.get("/history", userAuth, async (req, res) => {
  try {
    const history = await DietEntry.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
