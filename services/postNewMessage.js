const { PrismaClient } = require("@prisma/client");

async function postNewMessage(convoid, authorid, authorname, message) {
  const { prisma } = require("../config/db");

  try {
    const response = await prisma.message.create({
      data: {
        convoId: +convoid,
        author: +authorid,
        authorname: authorname,
        message: message,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

module.exports = { postNewMessage };
