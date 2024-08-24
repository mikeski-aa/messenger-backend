const { PrismaClient } = require("@prisma/client");

async function getMessages(convoid) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.findUnique({
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
