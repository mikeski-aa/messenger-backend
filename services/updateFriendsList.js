const { PrismaClient } = require("@prisma/client");

async function updateFriendsList(userA, userB) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.update({
      where: {
        id: +id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updateFriendsList };
