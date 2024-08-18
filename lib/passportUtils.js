const bcrypt = require("bcryptjs");

// password validation function
function validatePassword(password, hash) {
  // if hash is not present in DB return false
  if (typeof hash === "undefined") {
    return false;
  }

  // returns true or false
  let hashVerify = bcrypt.compareSync(password, hash);

  return hashVerify;
}

// password generate function
async function genPassword(password) {
  let salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;
