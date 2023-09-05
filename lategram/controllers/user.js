const User = require("../models/user");
const { BadRequestError, UnauthorizedError } = require("../errors/");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res) => {
	const { username, password } = req.body;
	const result = await User.create({
		username: username,
		password: password,
	});
	const token = result.createToken();
	res.status(StatusCodes.CREATED).json({ token });
};

const login = async (req, res) => {
	// console.log('inside login');
	const { username, password } = req.body;
	if (!username || !password) {
		throw new BadRequestError("please provide both username and password");
	}
	let user = await User.findOne({ username:username });
	if (user && await user.verifyPassword(password)) {
		const token = user.createToken();
		res.json({ token });
	} else {
		throw new UnauthorizedError("invalid username or password");
	}
};

const show = async (req, res) => {
	const users = await User.find({});
	res.json(users);
};
const deleteOne = async (req, res) => {
	const { id } = req.params;
	const users = await User.deleteOne({ _id: id }, { new: true });
	res.json(users);
};
const deleteAll = async (req, res) => {
	const result = await User.deleteMany({});
	res.send(result);
};
module.exports = {
	signup,
	login,
	show,
	deleteOne,
	deleteAll,
};
