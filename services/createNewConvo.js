const { PrismaClient } = require("@prisma/client");

async function createNewConvo(users) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.create({
      data: {
        participants: users,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
// createNewConvo([99, 98]);
module.exports = { createNewConvo };
