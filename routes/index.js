import express from 'express';
import passport from 'passport';
import url from 'url';
import { validationResult } from 'express-validator';
import { validate } from '../middleware/validatesanitize.js';
import {
  createMember,
  promoteMember,
} from '../controllers/memberController.js';
import { createDemographic } from '../controllers/demographicController.js';
import {
  createMessage,
  retrieveMessages,
  deleteMessage,
} from '../controllers/messageController.js';
const router = express.Router();

/* Redirect to home */
router.get('/', function (req, res) {
  res.redirect('/home');
});

/* GET home page. */
router.get('/home', retrieveMessages);

/* GET login page. */
router.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('login', {
      url: req.url,
      user: null,
      errors: null,
      autherror: null,
      email: null,
    });
  }
});

/* POST login page. */
router.post(
  '/login',
  validate('login'),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('login', {
        url: req.url,
        user: null,
        errors: errors.array(),
        autherror: null,
        email: req.body.username,
      });
    }
    next();
  },
  function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.render('login', {
          url: req.url,
          user: null,
          errors: null,
          autherror: info,
          email: req.body.username,
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/home');
      });
    })(req, res, next);
  }
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
      url: req.url,
      user: null,
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
      url: req.url,
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
router.post('/newmessage', validate('createMessage'), createMessage);

/* GET join club page */
router.get('/joinclub', function (req, res, next) {
  if (req.user) {
    res.render('joinclub', { user: req.user, errors: null, url: req.url });
  } else {
    res.redirect('/home');
  }
});

/* POST join club page */
router.post('/joinclub', validate('becomeClubMember'), promoteMember);

/* GET become admin page */
router.get('/becomeadmin', function (req, res, next) {
  if (req.user) {
    res.render('becomeadmin', { user: req.user, errors: null, url: req.url });
  } else {
    res.redirect('/home');
  }
});

/* POST become admin page */
router.post('/becomeadmin', validate('becomeAdmin'), promoteMember);

/* GET delete message page */
router.get('/delete/:?', function (req, res, next) {
  const params = url.parse(req.url, true).query;
  res.render('deletemessage', { item: params, user: req.user, url: req.url });
});

/* POST delete message page */
router.post('/delete/:?', deleteMessage);

export default router;
