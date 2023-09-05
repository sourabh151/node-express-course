const express = require("express");
const router = express.Router();
const {
	getChats,
	getChat,
	sendMessage,
	deleteAll,
	allMessages,
	deleteMessage,
} = require("../controllers/chats");
router.get("/", getChats);
router.get("/:chatId", getChat);
router.get("/message/all", allMessages);
router.post("/message/:friendId", sendMessage);
router.delete("/message/", deleteAll);
router.delete("/message/:messageId", deleteMessage);


module.exports = router;
