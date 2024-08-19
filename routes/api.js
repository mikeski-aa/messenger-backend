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

router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log("jwt authenticate worked");
    res.json({ message: "jwt auth working" });
  }
);

module.exports = router;
