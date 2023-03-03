module.exports = (req, res, next) => {
	if (!req.session.user.isAdmin) {
		console.log('Vui lòng bằng tài khoản quản trị viên để truy cập.');
		return res.redirect('/not-admin');
	}
	next();
};
