const { body, validationResult, query } = require("express-validator");
const { checkUserIsIsConvo } = require("../services/checkUserIsInConvo");

exports.validateUserInConvo = [
  query("convoid").trim().escape().toInt(),
  query("userid").trim().escape().toInt(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const response = await checkUserIsIsConvo(
      req.query.convoid,
      req.query.userid
    );

    console.log(response);

    if (!response) {
      res.status(403).json({ error: "Permission denied" });
    } else {
      next();
    }
  },
];
