//jshint esversion:10
//8:07
const express = require('express');

const app = express();

const people = require('./routes/people.js');
const auth = require('./routes/auth.js');

app.use(express.static('./methods-public'));

//urlencoded is used when data is sent using the
//default form submission
app.use(express.urlencoded({extended:true}));

//json is used when sending data using javascript
//this parses request body containing json
app.use(express.json());

app.use('/api/people',people);
app.use('/login',auth);



//get method


app.listen(3000,(err)=>{
	if(!err){
		console.log("server listening on 3000");
	}
});