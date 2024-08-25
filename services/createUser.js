const { PrismaClient } = require("@prisma/client");
const { genPassword } = require("../lib/passportUtils");
const { checkEmailExists } = require("../services/checkEmailExists");

async function createUser(email, username, password) {
  const { prisma } = require("../config/db");

  // check for existing user
  const checkEmail = await checkEmailExists(email);
  if (checkEmail === true) {
    return { error: "Email already exists" };
  }

  // gen hash
  const hash = await genPassword(password);
  try {
    const response = await prisma.user.create({
      data: {
        username: username,
        email: email,
        hash: hash,
      },
    });

    const test = { ...response, success: true };
    console.log(test);
    return test;
  } catch (error) {
    return { error: "Error creating a user" };
  }
}

module.exports = { createUser };
