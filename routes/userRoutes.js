
const express = require('express');
const routes = express.Router();

const { signUp,signIn } = require('../controllers/userAuth');

routes.post('/signup/api/create/user',signUp);

routes.post('/signin/api/user',signIn);

module.exports = {authRoutes: routes};