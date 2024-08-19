const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const { validatePassword } = require("../lib/passportUtils");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// need to use custom fields for email
const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (email, password, done) => {
  const prisma = new PrismaClient();
  console.log(email, password);
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

// new strategy requires verify callback
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

// TO DO: IMPLEMENT JWT.
// const verifyJWTCallback = (jwt_payload, done) => {
//   const prisma = new PrismaClient();
//   console.log("verify JWT shit");
//   console.log(jwt_payload);
//   prisma.user
//     .findFirst({
//       where: {
//         email: jwt_payload.email,
//       },
//     })
//     .then((user) => {
//       return done(null, user);
//     })
//     .catch((err) => {
//       return done(err, false, { message: "Token mismatch" });
//     });
// };

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (jwt_payload, done) => {
      console.log("verify JWT shit");
      console.log(jwt_payload);
      const prisma = new PrismaClient();
      prisma.user
        .findFirst({
          where: {
            email: jwt_payload.email,
          },
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, { message: "Token mismatch" });
        });
    }
  )
);
