const { PrismaClient } = require("@prisma/client");

async function getFriends(id) {
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
      },
    });
    return response[0].friends;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getFriends };
