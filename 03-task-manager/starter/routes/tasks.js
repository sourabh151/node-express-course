//jshint esversion:6
//3324
const express = require('express');
const router = express.Router();
 
const {
	getTasks,
	postTask,
	getTask,
	patchTask,
	deleteTask,
} = require('../controllers/tasks.js');

router.get('/',getTasks);
router.post('/',postTask);
router.get('/:id',getTask);
router.patch('/:id',patchTask);
router.delete('/:id',deleteTask);

module.exports = router;





