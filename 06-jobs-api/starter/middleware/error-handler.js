// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
// const {MongooseError} = require('../node_modules/mongoose/lib/error/mongooseError.js');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.msg || "something went wrong try again later",
    }

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }
    //${Object.keys(err.keyValue)}
    if(err.name === "ValidationError"){
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if(err.name === "CastError"){
        customError.msg = `No item found with ID ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    if(err.code && err.code === 11000){
      customError.msg = `Duplicate value entered for Email field,please choose another value`;
      customError.statusCode = 400; 
    }
    // console.log(err);
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
    return res.status(customError.statusCode).json({msg:customError.msg});
}

module.exports = errorHandlerMiddleware