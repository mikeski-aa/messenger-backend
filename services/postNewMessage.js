const { PrismaClient } = require("@prisma/client");

async function postNewMessage(convoid, authorid, authorname, message) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.message.create({
      data: {
        convoId: convoid,
        author: authorid,
        authorname: authorname,
        message: message,
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { postNewMessage };
