import Message from '../models/message.js';
import { validationResult } from 'express-validator';

export const createMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { message, view } = req.body;
    if (!errors.isEmpty()) {
      return res.render('newmessage', {
        user: req.user,
        errors: errors.array(),
        message: message,
        view: view,
      });
    }
    await Message.create({
      username: req.user._doc._id,
      message: message,
      date: new Date(),
      view: view,
    });
    res.redirect('/home');
  } catch (err) {
    return next(err);
  }
};
