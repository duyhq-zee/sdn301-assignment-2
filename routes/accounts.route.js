const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();

const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const accountsController = require('../controllers/accounts.controller');

const User = require('../models/user.model');

// router.use('/', (req, res, next) => {
// 	res.statusCode = 202;
// 	res.setHeader('Content-Type', 'text/plain');
// 	next();
// });

router.get('/', accountsController.getAccounts);

router.get(
	'/edit-account/:accountId',
	isAuth,
	accountsController.getEditAccount
);

router.post(
	'/edit-account/:accountId',
	isAuth,
	[
		body('email')
			.isEmail()
			.withMessage('Email không hợp lệ')
			.custom(async (value, { req }) => {
				const userDocs = await User.find({ email: value });

				console.log(userDocs.length);

				if (userDocs.length > 1) {
					return Promise.reject('Email đã tồn tại');
				}
			}),
		body('password').custom((value, { req }) => {
			if (value == null || value.length == 0) return true;
			if (value.length >= 5) {
				return 'Mật khẩu có ít nhất 5 kí tự và không được chứa kí tự đặc biệt';
			}
		}),
		body('confirmPassword').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Mật khẩu xác nhận không trùng khớp');
			}
			return true;
		}),
	],
	accountsController.postEditAccount
);

router.get('/:accountId', accountsController.getAccountById);

module.exports = router;
