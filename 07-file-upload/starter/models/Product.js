const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide name"],
		min: 3,
		max: 20,
	},
	price: {
		type: Number,
		required: [true, "please provide price"],
	},
	image:{
		type:String,
		required:[true,"please provide image"]
	}
});

module.exports = mongoose.model("Product", ProductSchema);
