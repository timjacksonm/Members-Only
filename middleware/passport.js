import passport from 'passport';
import LocalStrategy from 'passport-local';
import Member from '../models/member.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

function strategy(req, res, next) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log(username, password);
      Member.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user);
          } else {
            // passwords do not match!
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Member.findById(id, function (err, user) {
      done(err, user);
    });
  });
  next();
}

export default strategy;
