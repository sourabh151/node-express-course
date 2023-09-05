const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went wrong try again later",
    };

    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.name === "CastError") {
        customError.msg = `No item found with ID ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for Email field,please choose another value`;
        customError.statusCode = 400;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;

// const CustomAPIError = require('../errors/custom-api');
// const {StatusCodes} = require('http-status-codes');

// const errorHandlerMiddleware = (err, req, res, next) => {
//  console.log('inside error handler');
//  return res.status(err.statusCode||500).send(err.message);
// };
// module.exports = errorHandlerMiddleware;
