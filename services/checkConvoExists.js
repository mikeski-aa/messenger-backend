const { PrismaClient } = require("@prisma/client");

async function checkConvoExists(users) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.findMany({
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
