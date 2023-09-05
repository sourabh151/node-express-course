const express = require('express');

const router = express.Router();
let {people} = require('../data.js');


router.post('/',(req,res)=>{
    // console.log('in post');
    const {name} = req.body;
    for(let person of people){
        if(name === person.name){
            return res.send('welcome '+name);
        }
    }
    res.status(401).send('not authorized');
});


module.exports = router;