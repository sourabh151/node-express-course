const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,"must provide name"],
		trim:true,
		maxlength:[20,"length cannot be greater than 20 characters"],
	},
	completed:{
		type:Boolean,
		default:false
	},
});
// value gets replaced by the current value of schema property
// this inside schema points to the document created through model
module.exports = mongoose.model('Task',taskSchema);