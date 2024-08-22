const { PrismaClient } = require("@prisma/client");

async function checkRequestDuplicates(target, owner) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.reqstatus.findMany({
      where: {
        targetId: +target,
        ownerId: +owner,
      },
    });

    console.log(response.length);

    if (response.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function postRequestFriend(target, owner) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.reqstatus.create({
      data: {
        ownerId: +owner,
        targetId: +target,
        status: "pending",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { postRequestFriend, checkRequestDuplicates };

// checkRequestDuplicates(85, 82);
