//jshint esversion:10
//10333
const {BadRequestError} = require('../errors');
const jwt = require('jsonwebtoken');
const login = async(req,res)=>{
	//authentication
	//1mongo 
	//2joi
	//3check in the controller
	const {username,password} = req.body;
	if(!username|| !password){
		throw new BadRequestError('please provide proper username and password');
	}
	const id = new Date().getDate();
	const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'});
	res.status(200).json({msg:'user created',token});
};

const dashboard = async(req,res)=>{
	const randomNum = Math.floor(Math.random()*100);
	res.json({msg:`hey ${req.user.username}`,secret:`here is your lucky number :> ${randomNum}`});
};

module.exports = {
	login,
	dashboard,
};