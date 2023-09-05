//jshint esversion:10
//51037

const express = require('express');
const http = require('http');
const {readFileSync} = require('fs');
const path = require('path');

const app = express();

//app.use([path,] callback [, callback...])
//Mounts the specified middleware function or 
//functions at the specified path: the middleware 
//function is executed when the base of the 
//requested path matches path.
//callback params (req,res,next(method))

app.use(express.static('./public'));

//express.static(path[,options]);


app.get('/', (req,res)=>
    res.status(200).sendFile(path.resolve(__dirname,'./navbar-app/index.html'))); 






// app.get('/browser-app.js', (req,res)=>
//     res.status(200).sendFile(__dirname+'/navbar-app/browser-app.js'));
// app.get('/logo.svg', (req,res)=>
//     res.status(200).sendFile(__dirname+'/navbar-app/logo.svg'));
// app.get('/styles.css', (req,res)=>
//     res.status(200).sendFile(__dirname+'/navbar-app/styles.css'));

//app.all matches all HTTP verbs.
//The following callback is executed for requests to 
// /secret whether using GET, POST, PUT, DELETE, or 
//any other HTTP request method:
// /secret /secret/answer etc
app.all('*',(req,res)=>res.status(404).send('<h1>Resource not found</h1>'));



app.listen(3000);
