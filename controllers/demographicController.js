import Demographics from '../models/demographics.js';
import { validationResult } from 'express-validator';

export const createDemographic = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password, firstname, lastname, state, country } = req.body;
  if (errors.isEmpty()) {
    const reference = await Demographics.create({
      firstname: firstname,
      lastname: lastname,
      state: state,
      country: country,
    });
    res.locals.demographicId = reference;
    next();
  }
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
};
