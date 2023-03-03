var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const accessToken = req.session.accessToken;

	if (!accessToken) {
		return res.redirect('/login');
	}

	var decoded = jwt.verify(accessToken, 'My secret');

	req.session.user = decoded.user._doc;

	next();
};
