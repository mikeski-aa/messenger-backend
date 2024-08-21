const { PrismaClient } = require("@prisma/client");

async function getUser(username) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        id: true,
        username: true,
        status: true,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

module.exports = { getUser };
