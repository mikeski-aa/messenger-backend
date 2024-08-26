const { PrismaClient } = require("@prisma/client");

async function getMessages(convoid) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.findUnique({
      where: {
        id: +convoid,
      },
      include: {
        message: {
          select: {
            timestamp: true,
            author: true,
            convoId: true,
            message: true,
            authorname: true,
          },
          orderBy: {
            timestamp: "asc",
          },
        },
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { getMessages };
