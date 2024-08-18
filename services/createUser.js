const { PrismaClient } = require("@prisma/client");
const { genPassword } = require("../lib/passportUtils");
const { checkEmailExists } = require("../services/checkEmailExists");

async function createUser(email, username, password) {
  const prisma = new PrismaClient();

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

    console.log(response);

    return response;
  } catch (error) {
    return { error: "Error creating a user" };
  }
}

module.exports = { createUser };
