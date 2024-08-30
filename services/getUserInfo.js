const { PrismaClient } = require("@prisma/client");

async function getUserInfo(id) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.user.findMany({
      where: {
        id: +id,
      },
      include: {
        friends: {
          select: {
            id: true,
            username: true,
            status: true,
          },
        },
        targetRequests: {
          where: {
            targetId: +id,
          },
        },
      },
    });
    console.log(response[0].targetRequests);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserInfo };
