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

	res.render('accounts/edit-account-page', {
		path: '/accounts/edit-account',
		pageTitle: 'Chỉnh sửa tài khoản',
		user: decoded.user,
	});
};

exports.postEditAccount = (req, res, next) => {
	const { email, password, name, yearOfBirth } = req.body;

	User.findOne({ email: email }).then((user) => {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).render('accounts/edit-account-page', {
				path: '/accounts/edit-account',
				pageTitle: 'Chỉnh sửa tài khoản',
				errorMessage: errors.array()[0].msg,
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
					console.log(2);
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
