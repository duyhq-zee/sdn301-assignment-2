const express = require('express');
const { check, body } = require('express-validator');
const User = require('../models/user.model');

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/login', authController.getLogIn);

router.get('/signup', authController.getSignUp);

router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
		body('password', 'Mật khẩu không hợp lệ')
			.isLength({ min: 5 })
			.isAlphanumeric()
			.trim(),
	],
	authController.postLogIn
);

router.post(
	'/signup',
	[
		check('email')
			.isEmail()
			.withMessage('Email không hợp lệ')
			.custom(async (value, { req }) => {
				const userDoc = await User.findOne({ email: value });
				console.log(userDoc != null);
				if (userDoc !== null) {
					return Promise.reject('Email đã tồn tại');
				}
			}),
		body(
			'password',
			'Mật khẩu có ít nhất 5 kí tự và không được chứa kí tự đặc biệt'
		)
			.isLength({ min: 5 })
			.isAlphanumeric()
			.trim(),
		body('confirmPassword')
			.trim()
			.custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error('Mật khẩu xác nhận không trùng khớp');
				}
				return true;
			}),
	],
	authController.postSignUp
);

router.post('/logout', authController.postLogOut);

module.exports = router;
