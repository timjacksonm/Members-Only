import { body } from 'express-validator';
import Member from '../models/member.js';

export const validate = (method) => {
  switch (method) {
    case 'createDemographic': {
      return [
        body('firstname')
          .optional({ checkFalsy: true })
          .isLength({ min: 1, max: 30 })
          .withMessage(
            'First name must be between 1 and 30 characters in length.'
          )
          .isAlpha()
          .withMessage('Name must be alphabet letters.')
          .trim(),
        body('lastname')
          .optional({ checkFalsy: true })
          .isLength({ min: 1, max: 30 })
          .withMessage(
            'Last name must be between 1 and 30 characters in length.'
          )
          .isAlpha()
          .withMessage('Name must be alphabet letters.')
          .trim(),
        body('state')
          .optional({ checkFalsy: true })
          .isLength({ min: 2, max: 2 })
          .withMessage('State must be abbreviated and 2 characters in length.')
          .isAlpha()
          .withMessage('State must be alphabet letters.')
          .toUpperCase()
          .trim(),
        body('country')
          .optional({ checkFalsy: true })
          .isLength({ min: 2, max: 56 })
          .withMessage('Country must be between 2 and 56 characters in length.')
          .isAlpha('en-US', { ignore: ' ' })
          .withMessage('Country must be alphabet letters.')
          .trim(),
      ];
    }
    case 'createMember': {
      return [
        body('email')
          .isEmail()
          .withMessage('Email value is not a valid email address.')
          .exists()
          .custom((val) => Member.isUniqueEmail(val))
          .normalizeEmail({ all_lowercase: true })
          .trim(),
        body('password')
          .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
          })
          .withMessage(
            'Password must be a minimum length of 8 characters, contain atleast 1 lowercase letter, uppercase letter and a number.'
          )
          .trim(),
      ];
    }
    case 'createMessage': {
      return [
        body('message')
          .isLength({ min: 1, max: 50 })
          .withMessage(
            'Message must be a minimum length of 1 character and not have a maximium length greater than 50.'
          )
          .isAlphanumeric('en-US', { ignore: ' .' })
          .withMessage('Message must contain only letters and numbers.')
          .trim(),
        body('view')
          .exists()
          .withMessage('Select who will be allowed to see your message.')
          .trim(),
      ];
    }
  }
};
