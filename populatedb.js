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

async function addTestRequest(target, owner) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.reqstatus.create({
      data: {
        ownerId: owner,
        targetId: target,
        status: "pending",
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

async function addMessage(convoid, authorid, message, authorname) {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.message.create({
      data: {
        convoId: convoid,
        author: authorid,
        message: message,
        authorname: authorname,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// addMessage(23, 2, "First message test", "Tester");
// addMessage(23, 2, "Second message test", "Tester");
// addMessage(23, 1, "Reply test", "Mike");
// addMessage(
//   23,
//   2,
//   "Long reply text message Long reply text message Long reply text message Long reply text message Long reply text message ",
//   "Tester"
// );

// model message {
//   id Int @id @default(autoincrement())
//   convo converastion @relation(fields: [convoId], references: [id])
//   convoId Int
//   author Int
//   message String
//   timestamp DateTime @default(now())
// }

// addTestRequest(85, 82);

// showFriend(78);
// showFriend(34);
// addFriend(82, 85);

// userAddTest("test@test.com", "ONETEST", "ASDg1#$%%Z9sjd");
// userAddTest("dd@rest.com", "TWOTEST", "ASDg1#$ddd34%%Z9sjd");
// userAddTest("d3adddd@rest.com", "THREETEST", "ASDg1#$ddd34%%Z9d34DD3assjd");
