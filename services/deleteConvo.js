const { prisma } = require("../config/db");

async function deleteConvo(params) {
  try {
    const response = await prisma.conversation.delete({
      where: {
        id: +params.id,
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { deleteConvo };
