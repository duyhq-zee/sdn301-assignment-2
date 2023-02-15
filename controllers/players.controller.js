const Player = require('../models/player.model');

exports.getPlayers = (req, res, next) => {
	Player.find().then((players) => {
		res.render('players/player-list-page', {
			path: '/players',
			pageTitle: 'Danh sách cầu thủ',
			players: players,
		});
	});
};

exports.getAddPlayer = (req, res, next) => {
	res.render('players/add-player-page', {
		path: `/players/add-player`,
		pageTitle: 'Thêm cầu thủ',
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
	newPlayer.save();

	res.redirect('/players');
};

exports.getPlayerById = (req, res, next) => {
	Player.findById(req.params.playerId).then((player) => {
		console.log(player);
		res.render('players/player-detail-page', {
			path: `/players/${req.params.playerId}`,
			pageTitle: player.name,
			player: player,
		});
	});
};

exports.getEditPlayer = (req, res, next) => {
	Player.findById(req.params.playerId).then((player) => {
		res.render('players/edit-player-page', {
			path: `/players/edit-player/${req.params.playerId}`,
			pageTitle: player.name,
			player: player,
		});
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

		res.redirect(`/players/${player.id}`);
	});
};

exports.postRemovePlayer = (req, res, next) => {
	Player.findById(req.params.playerId).then((player) => {
		player.delete();
		res.redirect('/players');
	});
};
