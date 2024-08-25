const { PrismaClient } = require("@prisma/client");

async function updateFriendsList(userA, userB) {
  const { prisma } = require("../config/db");

  try {
    const responseOne = await prisma.user.update({
      where: {
        id: +userA,
      },
      data: {
        friends: { connect: [{ id: +userB }] },
      },
    });

    const responseTwo = await prisma.user.update({
      where: {
        id: +userB,
      },
      data: {
        friends: { connect: [{ id: +userA }] },
      },
    });

    return responseOne, responseTwo;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updateFriendsList };
