const express = require('express');
const User = require('../models/user.model');

const authController = require('../controllers/auth.controller');
const authValidation = require('../validations/auth.validation');

const router = express.Router();

router.get('/login', authController.getLogIn);

router.get('/signup', authController.getSignUp);

router.post('/login', authValidation.logIn, authController.postLogIn);

router.post('/signup', authValidation.signUp, authController.postSignUp);

router.post('/logout', authController.postLogOut);

module.exports = router;
