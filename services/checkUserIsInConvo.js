const { PrismaClient } = require("@prisma/client");

async function checkUserIsIsConvo(convoId, userId) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.findMany({
      where: {
        id: +convoId,
        participants: {
          has: +userId,
        },
      },
    });
    console.log(response + "xd");

    if (response.length > 0) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  } catch (error) {
    return { error: error };
  }
}

// checkUserIsIsConvo(25, 1);

module.exports = { checkUserIsIsConvo };
