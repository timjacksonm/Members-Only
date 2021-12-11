import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import errorHandler from './middleware/errorhandler.js';
import connectMongooseToDB from './middleware/mongodb.js';
import indexRouter from './routes/index.js';
import path from 'path';
const __dirname = path.resolve();

const app = express();

//Set up mongoose connection
app.use(connectMongooseToDB);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route catalog indexRouter
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

export default app;
