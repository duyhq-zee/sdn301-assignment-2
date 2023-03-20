const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.getAccounts = (req, res, next) => {};

exports.getAccountById = (req, res, next) => {
	const accessToken = req.session.accessToken;
	var decoded = jwt.verify(accessToken, 'My secret');

	res.render('accounts/my-account-page', {
		path: '/accounts',
		pageTitle: 'Tài khoản',
		user: decoded.user,
	});
};

exports.getEditAccount = (req, res, next) => {
	const accessToken = req.session.accessToken;
	var decoded = jwt.verify(accessToken, 'My secret');

	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}

	res.render('accounts/edit-account-page', {
		path: '/accounts/edit-account',
		pageTitle: 'Chỉnh sửa tài khoản',
		user: decoded.user,
		errorMessage: message,
	});
};

exports.postEditAccount = (req, res, next) => {
	const { email, password, name, yearOfBirth } = req.body;

	User.findById(req.params.accountId).then((user) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).render('accounts/edit-account-page', {
				path: '/accounts/edit-account',
				pageTitle: 'Chỉnh sửa tài khoản',
				errorMessage: errors.array()[0].msg,
				user: user,
				oldInput: {
					email: email,
					password: password,
					confirmPassword: req.body.confirmPassword,
					name: name,
					yearOfBirth: yearOfBirth,
				},
				validationErrors: errors.array(),
			});
		}

		bcrypt
			.hash(password, 12)
			.then((hashedPassword) => {
				// const user = new User({
				// 	email: email,
				// 	password: hashedPassword,
				// 	name: name,
				// 	yearOfBirth: yearOfBirth,
				// 	isAdmin: false,
				// });
				if (email != null && email != '') {
					user.email = email;
				}
				if (password != null && password != '') {
					user.password = hashedPassword;
				}
				if (name != null && name != '') {
					user.name = name;
				}
				if (yearOfBirth != null && yearOfBirth != '') {
					user.yearOfBirth = yearOfBirth;
				}
				return user.save();
			})
			.then((result) => {
				const accessToken = jwt.sign(
					{ user: { ...user._doc, password: null } },
					'My secret'
				);
				req.session.accessToken = accessToken;
				res.redirect(`/accounts/${user._id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

exports.getChangePassword = (req, res, next) => {
	const accessToken = req.session.accessToken;
	var decoded = jwt.verify(accessToken, 'My secret');

	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}

	res.render('accounts/change-password-page', {
		path: '/accounts/change-password',
		pageTitle: 'Chỉnh sửa tài khoản',
		user: decoded.user,
		errorMessage: message,
	});
};

exports.postChangePassword = (req, res, next) => {
	const { oldPassword, password, confirmPassword } = req.body;

	User.findById(req.params.accountId).then((user) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).render('accounts/change-password-page', {
				path: '/accounts/change-password',
				pageTitle: 'Chỉnh sửa tài khoản',
				errorMessage: errors.array()[0].msg,
				user: user,
				oldInput: {
					password: password,
					confirmPassword: confirmPassword,
				},
				validationErrors: errors.array(),
			});
		}

		bcrypt
			.hash(password, 12)
			.then((hashedPassword) => {
				if (password != null && password != '') {
					user.password = hashedPassword;
				}
				return user.save();
			})
			.then((result) => {
				const accessToken = jwt.sign(
					{ user: { ...user._doc, password: null } },
					'My secret'
				);
				req.session.accessToken = accessToken;
				res.redirect(`/accounts/${user._id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	});
};
