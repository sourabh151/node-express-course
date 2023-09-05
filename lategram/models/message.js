const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	sender:{
		type:mongoose.Schema.Types.ObjectId,
		required:[true,"please provide sender"],
		ref:"User"
	},
	message:{
		type:String,
		max:[300,'message limit exceeded'],
		required:[true,"please provide message"]
	},
	time:{
		type:Date,
		required:[true,"please provide date"]
	},
	receivers:{
		type:[mongoose.Schema.Types.ObjectId],
		required:[true,"please provide a receiver"],
		ref:"User"
	}
});

module.exports = mongoose.model('Message',messageSchema);
