const { PrismaClient } = require("@prisma/client");

function twoParticipants(array) {
  console.log(array);
  const temp = array.filter((item) => item.participants.length == 2);

  console.log(temp);
  return temp;
}

async function goThroughArray(array) {
  const tempArray = [];
  for (let x = 0; x < array.length; x++) {
    const user = await getUsernameStatus(array[x].userId);

    const newObj = {
      username: user[0].username,
      status: user[0].status,
      user: array[x].userId,
      convo: array[x].convoId,
      imageURL: user[0].imageURL,
    };

    tempArray.push(newObj);
  }

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
  console.log("temp  WE NEED");
  console.log(tempArray);

  return tempArray;
}

async function getUsernameStatus(userId) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.user.findMany({
      where: {
        id: +userId,
      },
      select: {
        username: true,
        status: true,
        imageURL: true,
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

async function getAllPrivateConvos(userId) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.findMany({
      where: {
        participants: {
          has: +userId,
        },
      },
    });

    const filteredResponse = twoParticipants(response);
    return filteredResponse;
  } catch (error) {
    return { error: error };
  }
}

module.exports = {
  getAllPrivateConvos,
  getUsernameStatus,
  getUniqueParticipants,
  goThroughArray,
};
