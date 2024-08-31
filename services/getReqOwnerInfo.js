const { PrismaClient } = require("@prisma/client");

async function getReqOwnerInfo(id) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        username: true,
        status: true,
        id: true,
        imageURL: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getReqOwnerInfo };
