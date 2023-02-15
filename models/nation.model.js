const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
});

const Nation = mongoose.model('nations', nationSchema);

module.exports = Nation;
