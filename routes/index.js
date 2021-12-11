import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/member.js';
const router = express.Router();

/* Redirect to home */
router.get('/', function (req, res) {
  res.redirect('/home');
});

/* GET home page. */
router.get('/home', function (req, res) {
  res.render('index');
});

/* GET login page. */
router.get('/login', function (req, res) {
  res.render('login');
});

/* POST login page. */
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

/* GET register page. */
router.get('/register', function (req, res) {
  res.render('sign-up-form');
});

/* POST register page. */
router.post('/register', function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    // otherwise, store hashedPassword in DB
    if (err) {
      return next(err);
    } else {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        status: 'Club Member',
      }).save((err) => {
        if (err) {
          return next(err);
        }
        req.user = user;
        res.redirect('/');
      });
    }
  });
});

export default router;
