const { PrismaClient } = require("@prisma/client");

function subofArray(total, num) {
  return total - num;
}

function getUniqueParticipants(userId, response) {
  const tempArray = [];

  for (let x = 0; x < response.length; x++) {
    const result = response[x].participants
      .filter((x) => x != userId)
      .reduce(subofArray);
    tempArray.push(result);
  }

  console.log(tempArray);
}

async function getUsernameStatus(userId) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      select: {
        username: true,
        status: true,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
}

async function getAllPrivateConvos(userId) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.converastion.findMany({
      where: {
        participants: {
          has: +userId,
        },
      },
    });
    return response;
  } catch (error) {
    return { error: error };
  }
}

// getAllPrivateConvos(1);
// getUsernameStatus(1);

getUniqueParticipants(1, [
  { id: 23, participants: [2, 1] },
  { id: 25, participants: [5, 1] },
]);

module.exports = {
  getAllPrivateConvos,
  getUsernameStatus,
  getUniqueParticipants,
};
