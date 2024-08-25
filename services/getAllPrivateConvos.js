const { PrismaClient } = require("@prisma/client");

async function goThroughArray(array) {
  const tempArray = [];
  for (let x = 0; x < array.length; x++) {
    const user = await getUsernameStatus(array[x].userId);
    const newObj = {
      username: user[0].username,
      status: user[0].status,
      user: array[x].userId,
      convo: array[x].convoId,
    };

    tempArray.push(newObj);
  }
  console.log(tempArray);
  return tempArray;
}

function subofArray(total, num) {
  return total - num;
}

function getUniqueParticipants(userId, response) {
  const tempArray = [];

  for (let x = 0; x < response.length; x++) {
    const result = response[x].participants
      .filter((x) => x != userId)
      .reduce(subofArray);
    const tempObj = {
      userId: result,
      convoId: response[x].id,
    };
    tempArray.push(tempObj);
  }

  return tempArray;
}

async function getUsernameStatus(userId) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.findMany({
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

// getUniqueParticipants(1, [
//   { id: 23, participants: [2, 1] },
//   { id: 25, participants: [5, 1] },
// ]);

// goThroughArray([
//   { userId: 2, convoId: 23 },
//   { userId: 5, convoId: 25 },
// ]);

module.exports = {
  getAllPrivateConvos,
  getUsernameStatus,
  getUniqueParticipants,
  goThroughArray,
};
