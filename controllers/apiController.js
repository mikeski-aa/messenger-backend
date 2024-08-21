const { body, validationResult, param, query } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { createUser } = require("../services/createUser");
const { getUser } = require("../services/getUser");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
exports.postLogin = asyncHandler(async (req, res, next) => {
  console.log("working fine");
  console.log(req.user);

  const token = jwt.sign({ email: req.user.email }, "secret", {
    expiresIn: "12h",
  });

  return res.json({ token: token });
});

// get request to check that user token is still valid, return user name and id
exports.getValidate = asyncHandler(async (req, res, next) => {
  const user = {
    username: req.user.username,
    id: req.user.id,
  };

  console.log(user);
  return res.json({ user });
});

// get users that match specific request username
exports.getUsers = [
  query("uname").isLength({ min: 1, max: 15 }).trim().escape(),
  query("id").toInt().trim().escape().isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.query.id);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // call service to query DB
    const response = await getUser(req.query.uname, req.query.id);

    return res.json(response);
  }),
];

// get friends
exports.getFriends = [
  query("id").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to get data from DB
    const response = await getFriends(req.query.id);
  }),
];
