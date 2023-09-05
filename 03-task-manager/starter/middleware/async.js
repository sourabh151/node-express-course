
//jshint esversion:10
const asyncWrapper = (fn)=>{
	//console.log(fn.toString());
	return async (req,res,next)=>{
		try{
			await fn(req,res,next);
		}catch(e){
			next(e);
		}
	};
};
//async wrapper wraps our fn function into a 
//try catch block and returns it to the calling 
//environment
module.exports = asyncWrapper;