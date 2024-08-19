const { body, validationResult } = require("express-validator");

exports.loginValidationMiddleware = [
  body("email").isEmail().trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 3 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error boom");
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
];
