const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	yearOfBirth: {
		type: Number,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const User = mongoose.model('users', userSchema);

module.exports = User;
