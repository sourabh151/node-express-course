//jshint esversion:10
const {CustomAPIError} = require('../errors/custom-error');

const errorHandlerMiddleware = (err,req,res,next)=>{
	if(err instanceof CustomAPIError){
		return res.status(err.statusCode).json({msg:err.message});
	}
	return res.status(500).json({msg:'could not process the request,please try again later'});
};
//eror handler middleware has four parameters
module.exports = errorHandlerMiddleware;