const { PrismaClient } = require("@prisma/client");

async function userAddTest(email, username, hash) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.user.create({
      data: {
        email: email,
        username: username,
        hash: hash,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// for remove, you would simply disconnect instead of connect
async function addFriend(idA, idB) {
  const prisma = new PrismaClient();

  const response = await prisma.user.update({
    where: { id: idA },
    data: { friends: { connect: [{ id: idB }] } },
  });

  const response2 = await prisma.user.update({
    where: { id: idB },
    data: { friends: { connect: [{ id: idA }] } },
  });

  console.log(response);
  console.log(response2);
}

async function showFriend(idA) {
  const prisma = new PrismaClient();

  const response = await prisma.user.findUnique({
    where: { id: idA },
    include: { friends: true },
  });

  console.log(response);
}

// showFriend(78);
// showFriend(34);
// addFriend(78, 34);

userAddTest("test@test.com", "TestUser", "ASDg1#$%%Z9sjd");
userAddTest("dd@rest.com", "AnotherTest", "ASDg1#$ddd34%%Z9sjd");
userAddTest("d3a@rest.com", "NotMe", "ASDg1#$ddd34%%Z9DD3assjd");
