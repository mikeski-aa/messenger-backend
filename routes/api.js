const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const passport = require("passport");
const validation = require("../middleware/loginRegisterMW");
const permission = require("../middleware/convoPermissionMW");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// testing route
router.get("/", (req, res, next) => {
  res.send("testing");
});

router.get("/test/:id", (req, res, next) => {
  res.send("xd");
});

// post register user
router.post(
  "/register",
  validation.registerValidationMiddleware,
  apiController.postRegister
);

// post user login
router.post(
  "/login",
  validation.loginValidationMiddleware,
  passport.authenticate("local", { session: false }),
  apiController.postLogin
);

// validation for protected routes
router.get(
  "/validate",
  passport.authenticate("jwt", { session: false }),
  apiController.getValidate
);

// get list of all users matching the username queried
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  apiController.getUsers
);

// get list of all friends of the user
router.get(
  "/userdata",
  passport.authenticate("jwt", { session: false }),
  apiController.getUserData
);

// post a new friend request
router.post(
  "/request",
  passport.authenticate("jwt", { session: false }),
  apiController.postRequest
);

// get info about request user
router.get(
  "/reqowner",
  passport.authenticate("jwt", { session: false }),
  apiController.getRequestOwnerInfo
);

// update user friends
router.put(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  apiController.updateFriends
);

// DELETE A REQUEST
router.delete(
  "/request",
  passport.authenticate("jwt", { session: false }),
  apiController.deleteFriendRequest
);

// delete friend
router.delete(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  apiController.deleteFriend
);

// post new conversation
router.post(
  "/convo",
  passport.authenticate("jwt", { session: false }),
  apiController.postNewConvo
);

// get conversation
router.get(
  "/convo",
  passport.authenticate("jwt", { session: false }),
  permission.validateUserInConvo,
  apiController.getConvo
);

// post a new message
router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  permission.validateUserInConvo,
  apiController.postMessage
);

// get DMs
router.get(
  "/userdms",
  passport.authenticate("jwt", { session: false }),
  apiController.getDMs
);

// delete convo
router.delete(
  "/convo/:id",
  passport.authenticate("jwt", { session: false }),
  permission.validateUserInConvo,
  apiController.deleteConvo
);

// post new group chat
router.post(
  "/group",
  passport.authenticate("jwt", { session: false }),
  apiController.postGroupChat
);

// get group convos (group convo is 3+ members!)
router.get(
  "/group",
  passport.authenticate("jwt", { session: false }),
  permission.validateUserInConvo,
  apiController.getAllUserGroups
);

// route for updating user status
router.put(
  "/userstatus",
  passport.authenticate("jwt", { session: false }),
  apiController.putUserStatus
);

// route for updating user name
router.put(
  "/username",
  passport.authenticate("jwt", { session: false }),
  apiController.putUserName
);

router.put(
  "/profileImg",
  passport.authenticate("jwt", { session: false }),
  upload.single("profpic"),
  apiController.postImage
);

module.exports = router;
