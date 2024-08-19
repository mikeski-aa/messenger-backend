const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const passport = require("passport");

// testing route
router.get("/", (req, res, next) => {
  res.send("testing");
});

// post register user
router.post("/register", apiController.postRegister);

// post user login
router.post(
  "/login",

  apiController.postLogin
);

module.exports = router;
