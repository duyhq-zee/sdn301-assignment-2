var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const accessToken = req.session.accessToken;

	if (!accessToken) {
		return res.redirect('/login');
	}

	var decoded = jwt.verify(accessToken, 'My secret');

	if (!decoded.user.isAdmin) {
		return res.redirect('/not-admin');
	}
	next();
};
