
import jwt from 'jsonwebtoken';
import passport from 'passport';

module.exports = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.render('login', {
          errors: [{ message: 'Incoorect pass or Username' }],
          user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(user, 'your_jwt_secret');
        res.render('dashboard', { name: user.fullName, token })
      });
    })(req, res, next);
  } catch (error) {
    console.log(error)
  }
};