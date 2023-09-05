const express = require('express');
const app = express();
const connectDB = require('./connect');
const mongoose = require('mongoose');
const User = require('./User');

app.get('/',(req,res,next) =>{
	let result;
	try{
		result = User.create({
		"name":"adi",
		
	});
	}
	catch(e){
		return next(e);
	}
	res.json(result);
});
const errorHandlerMiddleware = (err, req, res, next) => {
	console.log('in error'+err);
	res.send(err);
}
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB("mongodb://localhost:27017/test");
    app.listen(4000, () =>
      console.log(`Server is listening on port 4000...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();