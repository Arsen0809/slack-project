import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
const flash = require('connect-flash');
const session = require('express-session');
import routes from './routes/index';
dotenv.config();

require('./models')
require('./components/authentication/passport');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Connect flash
app.use(flash());


// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.token = req.query.token || req.body.token || req.headers.token
    next();
  });

app.use('/', routes);



// Run server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on ${port} port`));