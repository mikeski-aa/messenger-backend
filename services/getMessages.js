const { PrismaClient } = require("@prisma/client");

async function getMessages(convoid) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.findUnique({
      where: {
        id: +convoid,
      },
      include: {
        message: true,
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { getMessages };
