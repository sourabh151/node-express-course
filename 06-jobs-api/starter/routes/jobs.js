const express = require('express');
const jobsRouter = express.Router();
const {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
	// superAll,
	deleteAllJobs
} = require('../controllers/jobs');

jobsRouter.get('/',getAllJobs);
jobsRouter.post('/',createJob);
jobsRouter.get('/:id',getJob);
jobsRouter.patch('/:id',updateJob);
jobsRouter.delete('/:id',deleteJob);
jobsRouter.delete('/',deleteAllJobs);

// jobsRouter.get('/superAll/',superAll);


module.exports = jobsRouter;

