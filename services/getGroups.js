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

getLongerGroups([
  { id: 4, groupname: null, participants: [1, 2] },
  { id: 7, groupname: null, participants: [1, 3] },
  { id: 53, groupname: "XD", participants: [1, 2, 3] },
]);
// getGroups(1);

module.exports = { getGroups };
