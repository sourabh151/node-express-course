//jshint esversion:10

//custom api error class which extends error
//object
class CustomAPIError extends Error{
	constructor(message,statusCode){
		super(message);
		this.statusCode = statusCode;
	}
}

//function to create an instance of error
const createCustomError = (msg,status)=>{
	return new CustomAPIError(msg,status);
};

//we need to export both object and function
//as function creates an instance of the object
module.exports = {createCustomError,CustomAPIError};