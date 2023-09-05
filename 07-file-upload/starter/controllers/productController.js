const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');

const uploadProduct = async (req,res) =>{
	const result = await Product.create(req.body);
	res.status(StatusCodes.CREATED).json({result});
}

const getAllProducts = async (req,res)=>{
	const result = await Product.find({});
	res.status(StatusCodes.OK).json({result});
}

module.exports = {
	uploadProduct,
	getAllProducts,
}