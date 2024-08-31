async function updateUserUrl(id, url) {
  const { prisma } = require("../config/db");
  try {
    const response = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        imageURL: url,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

module.exports = { updateUserUrl };
