//jshint esversion:10
//2:4514
const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config();

const port = process.env.PORT || 3000;



app.use(express.static('./public'));

//middleware
app.use(express.json());


//routes

app.use('/api/v1/tasks/', tasks);

app.use(notFound);
//if we dont pass custom error handler then 
//error is handled by the default internal 
//express error handler
app.use(errorHandlerMiddleware);



const start = async () => {
    try {
    	// console.log(process.env);
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => { 
            console.log(`server is listening on port ${port}`);
        });

    } catch (e) {
        console.log(e);
    }
};
start();