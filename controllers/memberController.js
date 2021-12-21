import Member from '../models/member.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const createMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.render('signup', {
        user: null,
        url: req.url,
        errors: errors.array(),
        ...req.body,
      });
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        await Member.create({
          demographics: res.locals.demographicId,
          username: email,
          password: hashedPassword,
          status: 'Member',
          admin: false,
        });
        res.redirect('/login');
      }
    });
  } catch (err) {
    return next(err);
  }
};

export const promoteMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const string = req.url.split('');
      string.shift();
      return res.render(string.join(''), {
        url: req.url,
        user: req.user,
        errors: errors.array(),
      });
    }
    if (req.user.status === 'Club Member') {
      //change admin === true
      Member.findByIdAndUpdate(req.user.id, { admin: true }, function (err) {
        if (err) {
          next(err);
        }
      });
    }
    if (req.user.status === 'Member') {
      //change member to Club Member
      Member.findByIdAndUpdate(
        req.user.id,
        { status: 'Club Member' },
        function (err) {
          if (err) {
            next(err);
          }
        }
      );
    }
    res.redirect('/home');
  } catch (err) {
    return next(err);
  }
};
