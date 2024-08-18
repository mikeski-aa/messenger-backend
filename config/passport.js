const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");

const verifyCallback = (email, password, done) => {
  const prisma = new PrismaClient();

  prisma.user
    .findFirst({
      where: {
        email: email,
      },
    })
    .then((user) => {
      if (!user) {
        console.log("USER NOT FOUND");
        // user not present in DB
        // pass done callback to passport stating user was not found
        return done(null, false);
      }
      // function checking validity from utils -> compares password hash v.s stored hash
      // true or false
      const isValid = validatePassword(password, user.hash);

      if (isValid) {
        console.log("validation OK");
        return done(null, user);
      } else {
        console.log("wrong pass");
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};
