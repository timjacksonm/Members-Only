import express from 'express';
import passport from 'passport';
import { validate } from '../middleware/validatesanitize.js';
import { createMember } from '../controllers/memberController.js';
import { createDemographic } from '../controllers/demographicController.js';
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

/* GET signup page. */
router.get('/signup', function (req, res) {
  res.render('signup', {
    errors: null,
    email: null,
    password: null,
    firstname: null,
    lastname: null,
    state: null,
    country: null,
  });
});

/* POST signup page. */
router.post(
  '/signup',
  validate('createDemographic'),
  createDemographic,
  validate('createMember'),
  createMember
);

export default router;
