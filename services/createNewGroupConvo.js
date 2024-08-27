async function createNewGroupConvo(users, groupName) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.conversation.create({
      data: {
        participants: users,
        name: groupName,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { createNewGroupConvo };
