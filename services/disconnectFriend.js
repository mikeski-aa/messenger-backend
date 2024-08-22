const { PrismaClient } = require("@prisma/client");

async function disconnectFriend(userA, userB) {
  const prisma = new PrismaClient();

  try {
    const responseOne = await prisma.user.update({
      where: {
        id: +userA,
      },
      data: {
        friends: { disconnect: [{ id: +userB }] },
      },
    });

    const responseTwo = await prisma.user.update({
      where: {
        id: +userB,
      },
      data: {
        friends: { disconnect: [{ id: +userA }] },
      },
    });

    return responseOne, responseTwo;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { disconnectFriend };
