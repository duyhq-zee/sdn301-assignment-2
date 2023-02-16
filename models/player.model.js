const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	club: {
		type: String,
		required: true,
	},
	position: {
		type: String,
	},
	goals: {
		type: Number,
	},
	isCaptain: {
		type: Boolean,
		required: true,
	},
	nation: {
		type: String,
	},
});

const Player = mongoose.model('players', playerSchema);

module.exports = Player;
