var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const accessToken = req.session.accessToken;

	if (!accessToken) {
		return res.redirect('/login');
	}

	var decoded = jwt.verify(accessToken, 'My secret');
	console.log(decoded);

	if (!decoded.user.isAdmin) {
		console.log('Vui lòng bằng tài khoản quản trị viên để truy cập.');
		return res.redirect('/not-admin');
	}
	next();
};
