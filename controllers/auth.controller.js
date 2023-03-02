const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');

exports.getLogIn = (req, res, next) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('auth/log-in-page', {
		path: '/login',
		pageTitle: 'Login',
		errorMessage: message,
		oldInput: {
			email: '',
			password: '',
		},
		validationErrors: [],
	});
};

exports.getSignUp = (req, res, next) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('auth/sign-up-page', {
		path: '/signup',
		pageTitle: 'Signup',
		errorMessage: message,
		oldInput: {
			email: '',
			password: '',
			confirmPassword: '',
			name: '',
			yearOfBirth: '',
		},
		validationErrors: [],
	});
};

exports.postLogIn = (req, res, next) => {
	const { email, password, name, yearOfBirth } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('auth/log-in-page', {
			path: '/login',
			pageTitle: 'Login',
			errorMessage: errors.array()[0].msg,
			oldInput: {
				email: email,
				password: password,
			},
			validationErrors: errors.array(),
		});
	}

	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				return res.status(422).render('auth/log-in-page', {
					path: '/login',
					pageTitle: 'Login',
					errorMessage: 'Invalid email or password.',
					oldInput: {
						email: email,
						password: password,
						name: name,
						yearOfBirth: yearOfBirth,
					},
					validationErrors: [],
				});
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							console.log(req.session);
							console.log(err);
							res.redirect('/');
						});
					}
					return res.status(422).render('auth/log-in-page', {
						path: '/login',
						pageTitle: 'Login',
						errorMessage: 'Invalid email or password.',
						oldInput: {
							email: email,
							password: password,
						},
						validationErrors: [],
					});
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/login');
				});
		})
		.catch((err) => console.log(err));
};

exports.postSignUp = (req, res, next) => {
	console.log('OK');

	const { email, password, name, yearOfBirth } = req.body;

	const errors = validationResult(req);
	console.log(errors);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render('auth/sign-up-page', {
			path: '/signup',
			pageTitle: 'Signup',
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
			const user = new User({
				email: email,
				password: hashedPassword,
				name: name,
				yearOfBirth: yearOfBirth,
				isAdmin: false,
			});
			return user.save();
		})
		.then((result) => {
			res.redirect('/login');
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postLogOut = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};
