const express = require('express');
const authRouter = express.Router();

const {
	login,
	register,
	all,
	deleteOne,
	deleteAll,
} = require('../controllers/auth');

authRouter.post('/login',login);
authRouter.post('/register',register);
authRouter.get('/all',all);
authRouter.get('/deleteOne/:id',deleteOne);
authRouter.get('/deleteAll',deleteAll);



module.exports = authRouter;
