const { PrismaClient } = require("@prisma/client");

async function createNewConvo(users) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.converastion.create({
      data: {
        participants: users,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
}
// createNewConvo([1, 5]);
// createNewConvo([2, 1]);
module.exports = { createNewConvo };
