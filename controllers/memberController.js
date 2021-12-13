import Member from '../models/member.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const createMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { email, password, firstname, lastname, state, country } = req.body;
    if (!errors.isEmpty()) {
      return res.render('signup', {
        user: null,
        errors: errors.array(),
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        state: state,
        country: country,
      });
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        await Member.create({
          demographics: res.locals.demographicId,
          email: email,
          password: hashedPassword,
          status: 'Member',
        });
        res.redirect('/login');
      }
    });
  } catch (err) {
    return next(err);
  }
};
