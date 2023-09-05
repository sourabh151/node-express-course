//jshint esversion:8
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/index');

const authenticationMiddleware = async (req,res,next) =>{
	// const authHeader = req.headers.authorization.match(/(?<=Bearer )(\b.+\b)/i)[0];
	const authHeader = req.headers.authorization;
	// console.log(authHeader);
	if(!authHeader||!authHeader.startsWith('Bearer ')){
		throw new UnauthenticatedError('no token provided');
	}
	const token = authHeader.split(' ')[1];
	try{
		const decoded = jwt.verify(token,process.env.JWT_SECRET);
		const {id,username} = decoded;
		req.user = {id,username};
		//next is only called to pass control to dashboard callback and is not called if there is an error
		next();
	}catch(e){
		throw new UnauthenticatedError('invalid token provided');
	}
	// next();
};
module.exports = authenticationMiddleware;