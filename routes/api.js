const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const passport = require("passport");
const validation = require("../middleware/loginValidation");

// testing route
router.get("/", (req, res, next) => {
  res.send("testing");
});

// post register user
router.post("/register", apiController.postRegister);

// post user login
router.post(
  "/login",
  validation.loginValidationMiddleware,
  passport.authenticate("local", { session: false }),
  apiController.postLogin
);

module.exports = router;
