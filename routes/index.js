import express from 'express';
const router = express.Router();

/* Redirect to home */
router.get('/', function (req, res) {
  res.redirect('/home');
});

/* GET home page. */
router.get('/home', function (req, res) {
  res.send('NOT IMPLEMENTED: GET Home Page');
});

/* GET comments page. */
router.get('/comments', function (req, res) {
  res.send('NOT IMPLEMENTED: GET Comments Page');
});

/* GET login page. */
router.get('/login', function (req, res) {
  res.send('NOT IMPLEMENTED: GET Login Page');
});

/* GET register page. */
router.get('/register', function (req, res) {
  res.send('NOT IMPLEMENTED: GET Register Page');
});

export default router;
