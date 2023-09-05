const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
	{
		company:{
			type:String,
			required:[true,'please provide company name'],
			maxlength:50,
		},
		position:{
			type:String,
			required:[true,'please provide position'],
			maxlength:100,
		},
		status:{
			type:String,
			enum:['pending','interview','declined'],
			default:'pending'
		},
		createdBy:{
			type:mongoose.Types.ObjectId,
			//which model does the id reference
			ref:'User',
			required:[true,'please provide user'],
		}
	},
	{
		//automatically manages created at and updated at timestamps
		timestamps:true,
	});

module.exports = mongoose.model('Jobs',jobSchema);
