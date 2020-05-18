

import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
const router = express.Router()
import registerHandler from '../src/users/controllers/register';
import loginHnadler from '../src/users/controllers/login';
import workspacesHandler from '../src/workspaces/controllers/workspaces_get';
import workspacesCreate from '../src/workspaces/controllers/workspaces_create';
import workspacesDelete from '../src/workspaces/controllers/workspaces_delete';
import workspacesEdit from '../src/workspaces/controllers/workspaces_edit';
import workspacesEditForm from '../src/workspaces/controllers/workspaces_edit_form';
import workspacesCheckSubdomain from '../src/workspaces/controllers/workspaces_check_subdomain';


// Welcome page
router.get('/', (req, res) => res.render('welcome'))

// Dashboard page
router.get('/', (req, res) => res.render('dashboard'))

// Login page
router.get('/users/login', (req, res) => res.render('login'))

// Logout
router.get('/users/logout', (req, res) => res.render('login'))

// Register page
router.get('/users/register', (req, res) => res.render('register'))

// Register
router.post('/users/register', registerHandler)

// Login
router.post('/users/login', loginHnadler)

// Workspace
router.get('/workspaces/', passport.authenticate('jwt', { session: false }), workspacesHandler)

// Workspace Form
router.get('/workspaces/form', passport.authenticate('jwt', { session: false }), (req, res) => res.render('workspacesForm', {token: req.query.token}));
router.get('/workspaces/form/check-subdomain', workspacesCheckSubdomain);

// Workspace Edit Form
router.get('/workspaces/:id/edit/form', passport.authenticate('jwt', { session: false }), workspacesEditForm)

// Workspace create
router.post('/workspaces/create', passport.authenticate('jwt', { session: false }), workspacesCreate)
router.post('/workspaces/:id/edit', passport.authenticate('jwt', { session: false }), workspacesEdit)

// Workpsace delete
router.post('/workspaces/:id/delete', passport.authenticate('jwt', { session: false }), workspacesDelete)

  
module.exports = router