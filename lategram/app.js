const express = require("express");
const app = express();
//essentials
const PORT = process.env.PORT || 3000;
require("dotenv").config();
require("express-async-errors");
//db
const connectDB = require("./db/connect");

//middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authorizeMiddleware = require("./middleware/authorize");
const logger = require("./middleware/logger");

//routes
const userRouter = require("./routes/user");
const chatsRouter = require("./routes/chats");

// app.use(logger);
app.use(express.json());

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/chats/", [authorizeMiddleware, chatsRouter]);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	const connection = await connectDB(process.env.MONGO_URI);
	if (connection) {
		app.listen(PORT, () => {
			console.log(`app listening on port ${PORT}`);
		});
	}
};

start();
