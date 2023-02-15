const Nation = require('../models/nation.model');

exports.getNations = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			res.render('nations/nation-list-page', {
				nations: nations,
				pageTitle: 'Các quốc gia',
				path: '/nations',
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.getNationById = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			Nation.findById(req.params.nationId).then((nation) => {
				res.render('nations/nation-detail-page', {
					pageTitle: nation.name,
					path: `/nations/${nation.id}`,
					nations: nations,
					nation: nation,
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.getAddNation = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			res.render('nations/add-nation', {
				pageTitle: 'Thêm quốc gia',
				path: `/nations/add-nation`,
				nations: nations,
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.postAddNation = (req, res, next) => {
	let newNation = new Nation({
		name: req.body.name,
		description: req.body.description,
	});
	newNation.save().then((doc) => {
		res.redirect('/nations');
	});
};

// exports.deleteRemoveAllNations = (req, res, next) => {
// 	res.redirect('/nations');
// };

exports.getEditNation = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			Nation.findById(req.params.nationId).then((nation) => {
				res.render('nations/edit-nation', {
					pageTitle: nation.name,
					path: `/nations/edit-nation/${nation.id}`,
					nations: nations,
					nation: nation,
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.postEditNation = (req, res, next) => {
	Nation.findById(req.params.nationId)
		.then((nation) => {
			nation.name = req.body.name;
			nation.description = req.body.description;

			nation.save().then((doc) => {
				console.log(doc);
				res.redirect(`/nations/${nation.id}`);
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postRemoveNation = (req, res, next) => {
	Nation.findById(req.params.nationId)
		.remove()
		.then((doc) => {
			console.log(doc);
			res.redirect('/nations');
		});
};
