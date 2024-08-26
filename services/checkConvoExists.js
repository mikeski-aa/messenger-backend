const { PrismaClient } = require("@prisma/client");
const { prisma } = require("../config/db");

async function checkConvoExists(users) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.findMany({
      where: {
        participants: {
          hasEvery: users,
        },
      },
    });

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

checkConvoExists([1, 2]);

module.exports = { checkConvoExists };
