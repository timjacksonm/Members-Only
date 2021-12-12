export const createMember = async (req, res, next) => {
  try {
    console.log(res.locals.demographicId);
    res.redirect('/login');
  } catch (e) {
    res.render('signup', { error: e });
  }
};
