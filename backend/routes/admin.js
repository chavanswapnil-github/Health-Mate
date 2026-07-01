const express = require("express");
const router = express.Router();
const User = require("../models/User");
const DietEntry = require("../models/DietEntry");
const jwt = require("jsonwebtoken");

// ADMIN AUTH MIDDLEWARE
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No admin token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");

    if (!decoded.isAdmin && decoded.role !== "admin")
      return res.status(403).json({ message: "Admins only" });

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid admin token" });
  }
};

// ================== GET ALL USERS ===================
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== GET USER DIET HISTORY ===================
router.get("/user/:id/history", adminAuth, async (req, res) => {
  try {
    const history = await DietEntry.find({ user: req.params.id })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
