const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { CustomAPIError } = require("../errors/");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "please provide username"],
		unique: [true, "please provide a unique username"],
		minLength: 6,
		maxLength: 20,
	},
	password: {
		type: String,
		required: [true, "please provide password"],
	},
	friends: {
		type: [mongoose.Schema.Types.ObjectId],
		ref:"User"
	},
	chats: {
		type: [mongoose.Schema.Types.ObjectId],
		ref:"User"
	},
});

userSchema.methods.createToken = function () {
	// console.log(this._id + " " + this.username);
	return jwt.sign(
		{
			id: this._id,
			username: this.username,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_LIFETIME,
		}
	);
};
userSchema.pre("save", async function () {
	this.password = await bcrypt.hash(String(this.password), 10);
});
userSchema.methods.verifyPassword = async function (claimedPassword) {
	return bcrypt.compare(claimedPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
