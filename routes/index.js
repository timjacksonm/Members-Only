import express from 'express';
import passport from 'passport';
import { validate } from '../middleware/validatesanitize.js';
import { createMember } from '../controllers/memberController.js';
import { createDemographic } from '../controllers/demographicController.js';
import { createMessage } from '../controllers/messageController.js';
const router = express.Router();

/* Redirect to home */
router.get('/', function (req, res) {
  res.redirect('/home');
});

/* GET home page. */
router.get('/home', function (req, res) {
  res.render('index', { user: req.user || null });
});

/* GET login page. */
router.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('login', { user: null });
  }
});

/* POST login page. */
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
  })
);

/* POST logout. */
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/home');
});

/* GET signup page. */
router.get('/signup', function (req, res) {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('signup', {
      user: req.user || null,
      errors: null,
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      state: null,
      country: null,
    });
  }
});

/* POST signup page. */
router.post(
  '/signup',
  validate('createMember'),
  validate('createDemographic'),
  createDemographic,
  createMember
);

/* GET new message page. */
router.get('/newmessage', function (req, res, next) {
  if (req.user) {
    res.render('newmessage', {
      user: req.user,
      errors: null,
      message: null,
      view: null,
    });
  } else {
    res.redirect('/home');
  }
});

/* POST new message page. */
router.post(
  '/newmessage',
  function (req, res, next) {
    console.log(req);
    next();
  },
  validate('createMessage'),
  createMessage
);

export default router;
