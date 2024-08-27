async function createNewGroupConvo(users, group) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.create({
      data: {
        participants: users,
        groupname: group,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { createNewGroupConvo };
