//jshint esversion:10
//63559
const express = require('express');
const logger = require('./logger');
const authorize = require('./authorize');
const morgan = require('morgan');

const app = express();

//req => middleware => res

// app.use('/api',logger);

//app.use calls middleware function for all the path it matches
//app.use must be before all the get routes to work properly
///api will match any route after api

// app.use([logger,authorize]);
//middleware functions execute in the order they are specified in an array
//if middleware functions add a property to req object,it stays available to all the routing reqs

app.use(morgan('tiny'));
app.get('/',(req,res)=>{
    res.send('home');
    console.log(req.user);
});
app.get('/about',(req,res)=>{
    res.send('about');
    console.log(req.user);

});
app.get('/api/products',(req,res)=>{
    res.send('products');
    console.log(req.user);

});
app.get('/api/items',(req,res)=>{
    res.send('items');
    console.log(req.user);

});



app.listen(3000);