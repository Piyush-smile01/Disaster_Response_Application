const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Volunteer route working");
});

// Example POST (optional, but useful)
router.post("/register", (req, res) => {
  const data = req.body;
  res.json({
    message: "Volunteer registered",
    data,
  });
});

module.exports = router;
