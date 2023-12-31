const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,'please provide name'],
		minlength:3,
		maxlength:50,
	},
	email:{
		type:String,
		required:[true,'please provide email'],
		match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
		unique:true,
	},
	password:{
		type:String,
		required:[true,'please provide name'],
		minlength:6,
	},
});

userSchema.pre('save',async function (){
	this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.createToken = function (){
	return jwt.sign(
		{
			userId:this._id,
			name:this.name
		},
		process.env.JWT_SECRET,
		{
			expiresIn:process.env.JWT_LIFETIME
		}
		);
}
userSchema.methods.checkPassword = async function (claimedPassword){
	return await bcrypt.compare(claimedPassword,this.password);
	// console.log(result);
}

module.exports = mongoose.model('User',userSchema);