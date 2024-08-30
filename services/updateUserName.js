async function updateUserName(id, name) {
  const { prisma } = require("../config/db");
  try {
    const response = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        username: name,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

module.exports = { updateUserName };
