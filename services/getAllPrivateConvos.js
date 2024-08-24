const { PrismaClient } = require("@prisma/client");

async function getAllPrivateConvos(userId) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.findMany({
      where: {
        participants: {
          has: +userId,
        },
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { getAllPrivateConvos };
