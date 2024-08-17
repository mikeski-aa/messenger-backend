const { PrismaClient } = require("@prisma/client");

async function userAddTest(email, username, hash) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.create({
      data: {
        email: email,
        username: username,
        hash: hash,
        friendsOf: 2,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

userAddTest("test@test.com", "testER", "ASDg1#$%%Z9sjd");
// userAddTest("rest@rest.com", "restER", "ASDg1#$ddd34%%Z9sjd");
