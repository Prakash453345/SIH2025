import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import user from '../schemas/userSchema.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const findUser = await user.findOne({ username });

      if (!findUser) {
        return done(null, false, { message: "Username does not exist. Please register first." });
      }

      const isMatch = await bcrypt.compare(password, findUser.password);

      if (!isMatch) {
        return done(null, false, { message: "Invalid credentials." });
      }

      return done(null, findUser); 
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const existingUser = await user.findById(id);
    done(null, existingUser);
  } catch (err) {
    done(err);
  }
});
