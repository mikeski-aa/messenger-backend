const { PrismaClient } = require("@prisma/client");

async function deleteRequest(reqid) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.reqstatus.delete({
      where: {
        id: +reqid,
      },
    });

    console.log("delete response");
    console.log(response);

    return response;
  } catch (error) {
    console.log("delete error");
    console.log(error);
  }
}

module.exports = { deleteRequest };
