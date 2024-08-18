const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// testing route
router.get("/", (req, res, next) => {
  res.send("testing");
});

// post register user
router.post("/user", apiController.postRegister);
