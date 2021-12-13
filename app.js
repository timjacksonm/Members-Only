import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import errorHandler from './middleware/errorhandler.js';
import connectMongooseToDB from './middleware/mongodb.js';
import routes from './routes/index.js';
import path from 'path';
import strategy from './middleware/passport.js';
const __dirname = path.resolve();
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Set up mongoose connection
app.use(connectMongooseToDB);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(strategy);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// imports all of the routes from ./routes/index.js
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

export default app;
