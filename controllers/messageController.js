import Message from '../models/message.js';
import { format } from 'date-fns';
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
        })
          .populate('member')
          .then((result) => {
            if (result.length) {
              return result.map((object) => ({
                username: object.member.email.split('@')[0],
                role: object.member.status,
                message: object.message,
                date: format(object.date, 'Pp'),
              }));
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
        })
          .populate('member')
          .then((result) => {
            if (result.length) {
              return result.map((object) => ({
                username: object.member.email.split('@')[0],
                role: object.member.status,
                message: object.message,
                date: format(object.date, 'Pp'),
              }));
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
            return result.map((object) => ({
              username: 'anonymous',
              role: 'anonymous',
              message: object._doc.message,
              date: format(object._doc.date, 'PPpp'),
            }));
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
      member: req.user._doc._id,
      demographics: req.user.demographics,
      message: message,
      date: new Date(),
      view: view,
    });
    res.redirect('/home');
  } catch (err) {
    return next(err);
  }
};
