const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { createUser } = require("../services/createUser");
const passport = require("passport");

// POST new user register
// user registers with email, password, confirmed password and their desired username
// passwords must match, email has to be unique
exports.postRegister = [
  body("email").trim().isEmail().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 3 }).escape(),
  body("confirmPassword")
    .trim()
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  body("username").trim().isLength({ min: 1, max: 15 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    // check for errors and send a response
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.sendStatus(400).json({ errors: errors.array() });
    }

    const response = await createUser(
      req.body.email,
      req.body.username,
      req.body.password
    );

    if (response.success) {
      return res.status(200).json({ response });
      // return res.status(200).json({ user: response });
    } else {
      console.log("goinghere");
      return res.status(400).json({ message: "Error creating a user" });
    }
  }),
];

// on login:
// check that password matches hash created
// create JWT token in local storage
exports.postLogin = [
  body("email").isEmail().trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await passport.authenticate("local", { session: false });
    console.log(req.body);
    console.log("test");
  }),
];
