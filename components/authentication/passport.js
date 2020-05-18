
import passport from 'passport';
import passportJWT from 'passport-jwt';
import Users from '../../models/Users';
import bcrypt from 'bcrypt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  // Match User
  return Users.findOne({ where: { email }, raw: true })
    .then(user => {
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      // Match Pass
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: 'Password incorrect' });
        }
      });
    })
}
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromUrlQueryParameter('token'), ExtractJWT.fromBodyField('token')]),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, cb) => {
  return Users.findByPk(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
}
));