exports.getLogin = (req, res, next) => {
	console.log(1);
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: req.session.isLogin,
	});
};

exports.postLogin = (req, res, next) => {
	req.session.isLogin = true;
	res.redirect('/');
};

exports.getSignUp = (req, res, next) => {
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: req.session.isLogin,
	});
};

exports.postSignUp = (req, res, next) => {
	req.session.isLogin = true;
	res.redirect('/');
};

exports.postLogOut = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};
