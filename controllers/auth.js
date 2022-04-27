var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async (accestoken, refreshToken, profile, done) => {
      console.log(profile._json);
      const { sub: id, name, email, picture: url } = profile._json;
      try {
        const user = await User.findOne({
          where: { googleId: id },
        });

        if (!user) {
          const newuser = await User.create({
            username: name,
            email: email,
            googleId: id,
            picture: url,
          });

          return done(null, newuser);
        }

        return done(null, user);
      } catch (e) {
        console.log(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize user", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({
    where: { googleId: id },
  });
  console.log("deserialize user", user);

  if (user) done(null, user);
});
