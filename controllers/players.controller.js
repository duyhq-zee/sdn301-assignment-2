exports.getAllPlayers = (req, res, next) => {
	res.end('Will send all the players to you!');
};

exports.postAddOnePlayer = (req, res, next) => {
	res.end(
		`Will add the player: ${req.body.name} with details: ${req.body.club}`
	);
};

exports.deleteRemoveAllPlayers = (req, res, next) => {
	res.end('Deleting all players');
};

exports.getPlayerById = (req, res, next) => {
	res.end(
		'Will send details of the player: ' + req.params.playerId + ' to you!'
	);
};

exports.putUpdateOnePlayer = (req, res, next) => {
	res.write('Updating the player: ' + req.params.playerId + '\n');
	res.end(
		'Will update the player: ' +
			req.body.name +
			' with details: ' +
			req.body.club
	);
};

exports.deleteRemoveOnePlayer = (req, res, next) => {
	res.end(`Deleting player: ${req.params.playerId}`);
};
