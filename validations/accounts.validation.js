const bcrypt = require('bcrypt');
const { body } = require('express-validator');

const User = require('../models/user.model');

const changePassword = [
	body('oldPassword').custom(async (value, { req }) => {
		const user = await User.findById(req.params.accountId);

		bcrypt
			.compare(value, user.password)
			.then((doMatch) => {
				if (!doMatch) {
					throw new Error('Mật khẩu cũ không trùng khớp');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}),
	body('password')
		.isLength({ min: 5 })
		.isAlphanumeric()
		.withMessage(
			'Mật khẩu mới phải có ít nhất 5 kí tự và không được chứa kí tự đặc biệt'
		)
		.custom(async (value, { req }) => {
			const user = await User.findById(req.params.accountId);

			bcrypt
				.compare(value, user.password)
				.then((doMatch) => {
					if (doMatch) {
						throw new Error('Mật khẩu mới không được trùng mật khẩu cũ');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Mật khẩu xác nhận không trùng khớp');
		}
		return true;
	}),
];

module.exports = {
	changePassword,
};
