const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,UnauthenticatedError} = require('../errors');


const register = async (req,res) =>{
	//this will generate a document and before calling the documents save method
	//the pre hook would execute the pre save middleware causing the password to get 
	//hashed. the pre save hook is implemented on the schema
	const user = await User.create({...req.body});
	//createToken is an instance method to the schema in which this pointer points to the document object
	//we can create as many instance methods as we want with schemaname.methods.methodname = function(){}
	const token = user.createToken();
	res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}
const login = async (req,res) =>{
	const {email,password} = req.body;
	if(!email || !password){
		throw new BadRequestError('please provide proper credentials');
	}
	const user = await User.findOne({email});
	if(!user){
		throw new BadRequestError('no user with this email');
	}
	const isPasswordCorrect = await user.checkPassword(password);
	// console.log(`ipc:${isPasswordCorrect}`);
	if(!isPasswordCorrect){
		throw new UnauthenticatedError('wrong password');
	}
	req.user = {userId:user._id,name:user.name};
	const token = user.createToken();
	res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}

//my functionalities
const all = async (req,res) =>{
	const data = await User.find({});
	res.status(StatusCodes.OK).json(data);
}
const deleteOne = async (req,res) =>{
	const data = await User.deleteOne({_id:req.params.id});
	res.status(StatusCodes.OK).json(data);
}
const deleteAll = async (req,res) =>{
	const data = await User.deleteMany({});
	res.status(StatusCodes.OK).json(data);
}

module.exports = {
	login,
	register,
	all,
	deleteOne,
	deleteAll,
}