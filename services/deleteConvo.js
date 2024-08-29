const { PrismaClient } = require("@prisma/client");

async function deleteMsgs(id) {
  const { prisma } = require("../config/db");

  try {
    const deleteMsg = await prisma.message.deleteMany({
      where: {
        convoId: +id,
      },
    });

    return deleteMsg;
  } catch (error) {
    return { error: error };
  }
}

async function deleteConvo(id) {
  const { prisma } = require("../config/db");

  await deleteMsgs(id);

  try {
    const deleteConvo = await prisma.conversation.deleteMany({
      where: {
        id: +id,
      },
    });
    console.log(deleteConvo);
    return deleteConvo;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

// deleteConvo(26);
module.exports = { deleteConvo, deleteMsgs };
