//jshint esversion:10
//005513
const Jobs = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const superUser = "626706ec2a2a861e3c3aca41";

const getAllJobs = async (req, res) => {
    let all;
    const { userId } = req.user;
    if (userId === superUser) {
        all = await Jobs.find({}).sort('createdAt');
    } else {
        all = await Jobs.find({ createdBy: userId }).sort('createdAt');
        // console.log(all);		
    }
    res.status(StatusCodes.OK).json({all,count:all.length});
}
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    let single;
    if (userId === superUser) {
        single = await Jobs.findOne({ _id: jobId });
    } else {
        single = await Jobs.findOne({ _id: jobId, createdBy: userId });
    }
    if (!single) {
        throw new NotFoundError(`no jobs found with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json(single);
}
const createJob = async (req, res) => {
    const { company, position } = req.body;
    const newJob = await Jobs.create({
        company: company,
        position: position,
        createdBy: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json(newJob);
}
const updateJob = async (req, res) => {
    const {
        user: {
            userId
        },
        params: {
            id: jobId
        },
        body: {
            company,
            position,
            status,
        }
    } = req;
    if (company === '' || position === '') {
        throw new BadRequestError('company or position fields cannot be empty');
    }
    let update = {};
    if (company) { update.company = company }
    if (position) { update.position = position }
    if (status) { update.status = status }
    // console.log(update);
    let single;
    if (userId === superUser) {
        single = await Jobs.findOneAndUpdate({ _id: jobId }, update, { new: true, runValidators: true });
    } else {
        single = await Jobs.findOneAndUpdate({ _id: jobId, createdBy: userId }, update, { new: true, });
    }
    res.status(StatusCodes.OK).json(single);
}
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    let single;
    if (userId === superUser) {
        single = await Jobs.findOneAndDelete({ _id: jobId });
    } else {
        single = await Jobs.findOneAndDelete({ _id: jobId, createdBy: userId });
    }
    if (!single) {
        throw new NotFoundError(`no jobs found with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send();
}
const deleteAllJobs = async (req, res) => {
    if (req.user.userId === superUser) {
        const all = await Jobs.deleteMany();
        return res.status(StatusCodes.OK).json(all);
    }
    res.status(StatusCodes.UNAUTHORIZED).json("unauthorized to perform this operation");

}

// const superAll = async (req,res)=>{
// 	const all = await Jobs.find({createdBy:req.user.userId}).sort('createdAt');
// 	if(!all){
// 		throw new NotFoundError('no jobs found');
// 	}
// 	res.status(StatusCodes.OK).json(all);
// }
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    deleteAllJobs,
    // superAll,
}