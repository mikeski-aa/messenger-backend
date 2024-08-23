const { PrismaClient } = require("@prisma/client");

async function checkUserIsIsConvo(convoId, userId) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.findMany({
      where: {
        id: +convoId,
        participants: {
          has: +userId,
        },
      },
    });
    console.log(response);

    if (response.length > 0) {
      return true;
    } else {
      return false;
    }

    return response;
  } catch (error) {
    return { error: error };
  }
}

// checkUserIsIsConvo(23, 5);

module.exports = { checkUserIsIsConvo };
