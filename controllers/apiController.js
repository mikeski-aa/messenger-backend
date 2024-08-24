const { body, validationResult, param, query } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { createUser } = require("../services/createUser");
const { getUser } = require("../services/getUser");
const { getUserInfo } = require("../services/getUserData");
const {
  postRequestFriend,
  checkRequestDuplicates,
} = require("../services/postRequestFriend");
const { getReqOwnerInfo } = require("../services/getReqOwnerInfo");
const { updateFriendsList } = require("../services/updateFriendsList");
const { deleteRequest } = require("../services/deleteRecord");
const { disconnectFriend } = require("../services/disconnectFriend");
const { createNewConvo } = require("../services/createNewConvo");
const { checkConvoExists } = require("../services/checkConvoExists");
const { checkUserIsIsConvo } = require("../services/checkUserIsInConvo");
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

  // console.log(user);
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
exports.getUserData = [
  query("id").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to get data from DB
    const response = await getUserInfo(req.query.id);

    return res.json({
      friends: response[0].friends,
      requests: response[0].targetRequests,
    });
  }),
];

// post new friend request
exports.postRequest = [
  query("target").isLength({ min: 1 }).trim().escape(),
  query("user").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    // first we need to check if the request has already been created to prevent duplicates
    const isDuplicate = await checkRequestDuplicates(
      req.query.target,
      req.query.user
    );

    if (isDuplicate) {
      return res.json({ message: "Request already created!" });
    }
    // call service to create a new friend request
    const response = await postRequestFriend(req.query.target, req.query.user);
    return res.json(response);
  }),
];

// get request owner data
exports.getRequestOwnerInfo = [
  query("id").isLength({ min: 1 }).trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to get owner of request info
    const response = await getReqOwnerInfo(req.query.id);

    return res.json(response);
  }),
];

exports.updateFriends = [
  query("userA").isLength({ min: 1 }).trim().escape(),
  query("userB").isLength({ min: 1 }).trim().escape(),
  query("reqId").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to update existing user info
    const response = await updateFriendsList(req.query.userA, req.query.userB);

    // call service to delete existing user request
    const responseTwo = await deleteRequest(req.query.reqId);

    return res.json(response);
  }),
];

// delete query request -> when user declines
exports.deleteFriendRequest = [
  query("reqId").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to delete existing user request
    const response = await deleteRequest(req.query.reqId);
    return res.json(response);
  }),
];

// delete friend
exports.deleteFriend = [
  query("userA").isLength({ min: 1 }).trim().escape(),
  query("userB").isLength({ min: 1 }).trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to delete user relationship
    const response = await disconnectFriend(req.query.userA, req.query.userB);
    return res.json(response);
  }),
];

// create a new conversation
exports.postNewConvo = [
  body("users").trim().escape().toInt(),

  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // call service to check if the message has already been created
    // if it has been created, retrun that id for user redirect
    const isDuplicate = await checkConvoExists(req.body.users);
    if (isDuplicate.found === true) {
      return res.json({ convo: isDuplicate.response });
    }

    // call service to create new converstion
    const response = await createNewConvo(req.body.users);

    return res.json(response);
  }),
];

// get conversation content:
exports.getConvo = asyncHandler(async (req, res, next) => {
  // query data checked by middleware already

  // call service to get message info:

  return res.json({ text: "xd" });
});
