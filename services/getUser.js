const { PrismaClient } = require("@prisma/client");

async function getUser(username, id) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
        id: { not: +id },
      },
      select: {
        id: true,
        username: true,
        status: true,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
}

module.exports = { getUser };
