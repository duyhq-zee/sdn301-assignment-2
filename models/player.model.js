const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		default: ' ',
	},
	imageUrl: {
		type: String,
		default: ' ',
	},
	club: {
		type: String,
		required: true,
		default: ' ',
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
		default: false,
	},
	nation: {
		type: String,
	},
});

const Player = mongoose.model('players', playerSchema);

module.exports = Player;
