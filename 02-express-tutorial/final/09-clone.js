const express = require('express');
const authorize = require('./authorize');
const logger = require('./logger');
const app = express();

app.use([logger,authorize]);
app.get('/',(req,res)=>{
    res.status(200).json(req.user);
});

app.listen(5000,()=>{
    console.log('server is listening on port 5000');
})