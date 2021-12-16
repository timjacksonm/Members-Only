import Demographics from '../models/demographics.js';
import { validationResult } from 'express-validator';

export const createDemographic = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { email, password, firstname, lastname, state, country } = req.body;
    if (!errors.isEmpty()) {
      return res.render('signup', {
        user: null,
        url: req.url,
        errors: errors.array(),
        ...req.body,
      });
    }
    const formSubmissionWithInputs = Object.entries(req.body).filter(
      ([key, value]) => value.length > 0
    );
    const reference = await Demographics.create({
      ...formSubmissionWithInputs,
    });
    res.locals.demographicId = reference;
    next();
  } catch (err) {
    return next(err);
  }
};
