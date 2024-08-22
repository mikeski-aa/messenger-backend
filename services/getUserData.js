const { PrismaClient } = require("@prisma/client");

async function getUserInfo(id) {
  const prisma = new PrismaClient();

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
        requests: true,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUserInfo };
