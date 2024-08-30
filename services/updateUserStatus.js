async function updateUserStatus(id, status) {
  const { prisma } = require("../config/db");
  try {
    const response = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        status: status,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

module.exports = { updateUserStatus };
