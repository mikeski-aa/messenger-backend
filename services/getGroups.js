function getLongerGroups(response) {
  const tempArray = [];

  for (let x = 0; x < response.length; x++) {
    if (response[x].participants.length >= 3) {
      tempArray.push(response[x]);
    }
  }
  console.log(tempArray);
  return tempArray;
}

async function getUsername(userId) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.user.findMany({
      where: {
        id: +userId,
      },
      select: {
        username: true,
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

async function getGroupNames(response) {
  const { prisma } = require("../config/db");

  // double loop is bad. O(n^2).
  for (let x = 0; x < response.length; x++) {
    const unameArray = [];
    for (let y = 0; y < response[x].participants.length; y++) {
      const uname = await getUsername(response[x].participants[y]);
      unameArray.push(uname[0].username);
    }

    response[x] = { ...response[x], usernames: unameArray };
  }

  return response;
}

async function getGroups(userid) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.findMany({
      where: {
        participants: {
          has: +userid,
        },
      },
    });

    const groupConvos = getLongerGroups(response);

    return groupConvos;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

getGroupNames([
  { id: 4, groupname: null, participants: [1, 2] },
  { id: 7, groupname: null, participants: [1, 3] },
  { id: 53, groupname: "XD", participants: [1, 2, 3] },
]);
// getGroups(1);

module.exports = { getGroups, getGroupNames };
