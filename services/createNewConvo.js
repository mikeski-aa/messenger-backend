const { PrismaClient } = require("@prisma/client");

async function createNewConvo(users) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.create({
      data: {
        participants: users,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createNewConvo };
