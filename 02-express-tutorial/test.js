//jshint esversion:10
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/test.html');
});
app.post('/testing',(req,res)=>{
	console.log(req.body);
	res.send('done');
});


app.listen(3000);
