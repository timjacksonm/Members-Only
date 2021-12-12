import Demographics from '../models/demographics.js';

export const createDemographic = async (req, res, next) => {
  const { username, password, firstName, lastName, state, country } = req.body;
  try {
    const reference = await Demographics.create({
      firstname: firstName,
      lastname: lastName,
      state: state,
      country: country,
    });
    res.locals.demographicId = reference;
    next();
  } catch (e) {
    let props;
    switch (Object.keys(e.errors)[0]) {
      case 'firstname':
        props = {
          inputName: 'First Name',
          message: e.errors.firstname.message.split(') ')[1],
        };
        break;
      case 'lastname':
        props = {
          inputName: 'Last Name',
          message: e.errors.lastname.message.split(') ')[1],
        };
        break;
      case 'state':
        props = {
          inputName: 'State',
          message: e.errors.state.message.split(') ')[1],
        };
        break;
      case 'country':
        props = {
          inputName: 'Country',
          message: e.errors.country.message.split(') ')[1],
        };
        break;
      default:
        break;
    }
    res.render('signup', {
      error: e.errors,
      ...props,
      ...{
        username: username,
        password: password,
        firstname: firstName,
        lastname: lastName,
        state: state,
        country: country,
      },
    });
  }
};
