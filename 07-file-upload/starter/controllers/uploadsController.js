const path = require("path");
const errors = require("../errors");

const uploadProductImageLocal = async (req, res) => {
	// console.log(req.files);

	if (!req.files) {
		throw new errors.BadRequestError("no files provided");
	}
	const image = req.files.image;
	const loc = path.join(__dirname, "../public/uploads", image.name);
	console.log(loc);
	if (!image.mimetype.startsWith("image")) {
		console.log("not image");

		throw new errors.BadRequestError("please provide only image files");
	}
	const limit = 1024 * 1024;
	if (image.size > limit) {
		console.log("big image");

		throw new errors.BadRequestError("file size exceeded");
	}
	await image.mv(loc);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${image.name}` } });
};
module.exports = {
	uploadProductImageLocal,
};
