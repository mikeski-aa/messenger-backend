const { PrismaClient } = require("@prisma/client");
import { genPassword } from "../lib/passportUtils";

async function createUser(email, username, pasword) {
  const prisma = new PrismaClient();
}

module.exports = { createUser };
