async function updateUserStatus(id, status) {
  const { prisma } = require("../config/db");
  try {
    const response = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        staatus: status,
      },
    });

    return response;
  } catch (error) {
    return { error: error };
  }
}

module.exports = { updateUserStatus };
