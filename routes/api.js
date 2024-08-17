const express = require("express");
const router = express.Router();

// testing route
router.get("/", (req, res, next) => {
  res.send("testing");
});
