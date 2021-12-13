import Message from '../models/message.js';
import { validationResult } from 'express-validator';

export const retrieveMessages = async (req, res, next) => {
  try {
    let messages;
    let memberStatus = req.user ? req.user.status : 'Public';
    switch (memberStatus) {
      case 'Club Member':
        messages = await Message.find({
          $and: [
            {
              $or: [
                { view: 'Club Members Only' },
                { view: 'Members Only' },
                { view: 'Public' },
              ],
            },
          ],
        }).then((result) => {
          if (result.length) {
            return result;
          }
        });
        break;
      case 'Member':
        messages = await Message.find({
          $and: [
            {
              $or: [{ view: 'Members Only' }, { view: 'Public' }],
            },
          ],
        }).then((result) => {
          if (result.length) {
            return result;
          }
        });
        break;
      case 'Public':
        messages = await Message.find({
          $and: [
            {
              $or: [{ view: 'Public' }],
            },
          ],
        }).then((result) => {
          if (result.length) {
            return result;
          }
        });
        break;
    }
    res.render('index', { user: req.user || null, messages: messages });
  } catch (e) {
    next(e);
  }
};

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
