const express = require('express');

const {registerUser, handleLogin, handlerForgotPassword,getUserAccount} = require('../controllers/auth.controller')
const auth_router = express.Router();

auth_router.post('/register', registerUser);
auth_router.post('/login', handleLogin);
auth_router.post('/forgot-password', handlerForgotPassword);
auth_router.get('/account', getUserAccount);

module.exports = auth_router;