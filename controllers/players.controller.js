const Player = require('../models/player.model');
const Nation = require('../models/nation.model');

exports.getPlayers = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			let perPage = 4;
			let page = req.params.page || 1;

			Player.find().exec((err, players) => {
				Player.countDocuments((err, count) => {
					if (err) return next(err);
					res.render('players/player-list-page', {
						path: '/players',
						pageTitle: 'Danh sách cầu thủ',

						players: players,
						nations: nations,
						currentPage: page,
						pagesNumber: Math.ceil(count / perPage),
					});
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.searchPlayers = async (req, res, next) => {
	const {
		searchInput,
		clubFilter,
		nationFilter,
		positionFilter,
		isCaptainFilter,
	} = req.body;

	let players = await Player.find();

	if (clubFilter != 'All') {
		players = players.filter((p) => p.club == clubFilter);
	}

	if (nationFilter != 'All') {
		players = players.filter((p) => p.nation == nationFilter);
	}

	if (positionFilter != 'All') {
		players = players.filter((p) => p.position == positionFilter);
	}

	if (isCaptainFilter != 'All') {
		players = players.filter((p) => p.isCaptain.toString() == isCaptainFilter);
	}

	res.send(players);
};

exports.getAddPlayer = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			res.render('players/add-player-page', {
				path: `/players/add-player`,
				pageTitle: 'Thêm cầu thủ',

				nations: nations,
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.postAddPlayer = (req, res, next) => {
	let newPlayer = new Player();
	newPlayer.name = req.body.name;
	newPlayer.imageUrl = req.body.imageUrl;
	newPlayer.club = req.body.club;
	newPlayer.isCaptain = req.body.isCaptain == 'true';
	newPlayer.nation = req.body.nation;
	newPlayer.position = req.body.position;
	newPlayer.goals = +req.body.goals;

	newPlayer.save().then(() => {
		res.redirect('/players');
	});
};

exports.getPlayerById = (req, res, next) => {
	Player.findById(req.params.playerId).then((player) => {
		res.render('players/player-detail-page', {
			path: `/players/${req.params.playerId}`,
			pageTitle: player.name,

			player: player,
		});
	});
};

exports.getEditPlayer = (req, res, next) => {
	Nation.find()
		.then((nations) => {
			Player.findById(req.params.playerId).then((player) => {
				res.render('players/edit-player-page', {
					path: `/players/edit-player/${req.params.playerId}`,
					pageTitle: player.name,

					player: player,
					nations: nations,
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.end('Error');
		});
};

exports.postEditPlayer = (req, res, next) => {
	Player.findById(req.params.playerId).then((player) => {
		player.name = req.body.name;
		player.club = req.body.club;
		player.nation = req.body.nation;
		player.position = req.body.position;
		player.isCaptain = req.body.isCaptain == 'true';
		player.goals = +req.body.goals;

		player.save();

		res.redirect(`/players/${player._id}`);
	});
};

exports.postRemovePlayer = (req, res, next) => {
	Player.findById(req.params.playerId).then((player) => {
		player.delete();
		res.redirect('/players');
	});
};
