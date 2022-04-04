const mongoose = require('mongoose');
const role = require('../config/role')
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	role:{
		type: String,
	},
	password: {
		type: String,
	}, 
})

module.exports = userModel = mongoose.model('userModel', userSchema);