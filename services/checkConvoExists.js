const { PrismaClient } = require("@prisma/client");
const { prisma } = require("../config/db");

async function checkConvoExists(users) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.findMany({
      where: {
        participants: {
          equals: users,
        },
      },
    });

    console.log(response);

    if (response.length === 0) {
      return { found: false, response };
    } else {
      return { found: true, response };
    }
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

// checkConvoExists([1, 2, 3]);

module.exports = { checkConvoExists };
