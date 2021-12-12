import Demographics from '../models/demographics.js';
import { validationResult } from 'express-validator';

export const createDemographic = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { email, password, firstname, lastname, state, country } = req.body;
    if (!errors.isEmpty()) {
      return res.render('signup', {
        errors: errors.array(),
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        state: state,
        country: country,
      });
    }

    const reference = await Demographics.create({
      firstname: firstname,
      lastname: lastname,
      state: state,
      country: country,
    });
    req.locals.demographicId = reference;
    next();
  } catch (err) {
    return next(err);
  }
};
