const { PrismaClient } = require("@prisma/client");

async function checkEmailExists(email) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (response === null) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { checkEmailExists };
