const jwt = require('jsonwebtoken');
const {BadRequestError,UnauthenticatedError} = require('../errors');


const authenticate = (req,res,next) =>{
	const header = req.headers.authorization;
	// console.log(header);
	if(!header || !header.startsWith('Bearer')){
		throw new UnauthenticatedError('Authentication invalid');
	}
	const token = header.split(' ')[1];
	// console.log(token);
	try{
		const payload = jwt.verify(token,process.env.JWT_SECRET);
		// console.log(payload);
		req.user = {
			userId:payload.userId,
			name : payload.name,
		};
		next();
	}
	catch{
		throw new UnauthenticatedError('Authentication invalid');

	}
}
module.exports = authenticate;