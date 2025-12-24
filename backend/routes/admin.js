const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Admin route working");
});

// Example admin action
router.post("/login", (req, res) => {
  const { email } = req.body;
  res.json({
    message: `Admin ${email} logged in`,
  });
});

module.exports = router;
