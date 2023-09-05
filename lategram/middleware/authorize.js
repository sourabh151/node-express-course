const User = require("../models/user");
const errors = require("../errors");
const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
	const bearer = req.header("Authorization");
	if (!bearer || !bearer.startsWith("Bearer ")) {
		throw new errors.BadRequestError("invalid token");
	}
	const token = bearer.split(" ")[1];
	// console.log(token);
	const data = await jwt.verify(token, process.env.JWT_SECRET);
	// console.log(data);
	User.findOne({ _id: data.id }, (err, user) => {
		if (err) {
			throw new errors.UnauthorizedError(
				`no person with id:${data.id} found on database`
			);
		}
		req.user = {
			_id: user._id,
			username: user.username,
			chats: user.chats,
		};
		next();
	});
	// console.log(result);
	// console.log(data);

	// let result;
};

module.exports = authorize;
