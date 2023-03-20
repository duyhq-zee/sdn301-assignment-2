const { check, body } = require('express-validator');

const User = require('../models/user.model');

const logIn = [
	body('email').isEmail().withMessage('Email không hợp lệ'),
	body('password', 'Mật khẩu không hợp lệ')
		.isLength({ min: 5 })
		.isAlphanumeric(),
];

const signUp = [
	check('email')
		.isEmail()
		.withMessage('Email không hợp lệ')
		.custom(async (value, { req }) => {
			const userDoc = await User.findOne({ email: value });

			if (userDoc !== null) {
				return Promise.reject('Email đã tồn tại');
			}
		}),
	body(
		'password',
		'Mật khẩu có ít nhất 5 kí tự và không được chứa kí tự đặc biệt'
	)
		.isLength({ min: 5 })
		.isAlphanumeric(),

	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Mật khẩu xác nhận không trùng khớp');
		}
		return true;
	}),
];

module.exports = {
	logIn,
	signUp,
};
