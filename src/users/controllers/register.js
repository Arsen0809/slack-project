import bcrypt from 'bcrypt';
import Users from '../../../models/Users';
import uuidv1 from 'uuid/v1';


module.exports = async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      console.log('error', errors)
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      const userExist = await Users.findOne({ where: { email: email } })
      if (userExist) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            if (err) throw err;
            await Users.create({
              fullName: name,
              email,
              password: hash,
            })
            await req.flash(
              'success_msg',
              'You are now registered and can log in'
            );
            res.redirect('/users/login');
          });
        });
      }
    }
  } catch (error) {
    console.log(error)
  }
};