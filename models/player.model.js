const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.ObjectId },
	name: { type: String, required: true },
	image: { type: String },
	club: { type: String, required: true },
	position: { type: String },
	goals: { type: Number },
	isCaptain: { type: Boolean, required: true },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
