const User = require("../models/user");
const Message = require("../models/message");
const errors = require("../errors");

const getChats = async (req, res) => {
	// console.log(req.user);
	let result = [];
	await Promise.all(
		req.user.chats.map(async (friendId) => {
			// console.log(friendId);
			const friend = await User.findById(friendId);
			result.push({ _id: friend._id, username: friend.username });
		})
	);
	res.send(result);
};

const getChat = async (req, res) => {
	const { chatId } = req.params;
	const senderMessages = await Message.find({
		sender: req.user._id,
		receivers: { $in: chatId },
	});
	const receiverMessages = await Message.find({
		sender: chatId,
		receivers: { $in: req.user._id },
	});
	// console.log({ senderMessages });
	// console.log({ receiverMessages });
	let totalMessages = [];
	if (senderMessages.length === 0) {
		totalMessages = receiverMessages;
	} else if (receiverMessages.length === 0) {
		totalMessages = senderMessages;
	} else {
		totalMessages = JSON.parse(
			JSON.stringify(senderMessages).replace(/]$/, ",") +
				JSON.stringify(receiverMessages).replace("[", "")
		);
	}

	totalMessages.sort((one, two) => {
		return Date.parse(one.time) - Date.parse(two.time);
	});

	res.json({ totalMessages });
};
const sendMessage = async (req, res) => {
	const { friendId } = req.params;
	await User.findById(friendId);
	const { message } = req.body;
	const result = await Message.create({
		sender: req.user._id,
		message: message,
		time: new Date(),
		receivers: [friendId],
	});
	const sender = await User.findByIdAndUpdate(
		req.user._id,
		{
			$addToSet: { chats: friendId },
		},
		{
			returnDocument: "after",
		}
	);
	const receiver = await User.findByIdAndUpdate(
		friendId,
		{
			$addToSet: { chats: req.user._id },
		},
		{
			returnDocument: "after",
		}
	);
	res.send(result);
};
const deleteMessage = async (req, res) => {
	const { messageId } = req.params;
	const result = await Message.deleteOne({ _id: messageId });
	res.json({ result });
};
const deleteAll = async (req, res) => {
	const result = await Message.deleteMany({});
	res.send(result);
};

const allMessages = async (req, res) => {
	const result = await Message.find({});
	res.json({ result });
};
module.exports = {
	getChats,
	getChat,
	sendMessage,
	deleteAll,
	allMessages,
	deleteMessage,
};
