const express = require('express');
const app = express();
const {people} = require('../data');
const PORT = 5000;

let MAXID = 0;
people.every((v)=>{
    MAXID = MAXID>Number(v.id)?MAXID:Number(v.id);
});
//server static files from the folder
app.use(express.static('./methods-public-clone/'));
//parse urlEncodedObjects
app.use(express.urlencoded({extended:false}));
//parse json objects sent by the javascript form
app.use(express.json());

app.get('/api/people',(req,res)=>{
    res.status(200).json({"success":true,"data":people});
})
app.post('/api/people',(req,res)=>{
    const {name}= req.body;
    if(!name){
        return res.status(400).json({"success":false,"msg":"please provide a name"});
    }
    people.push({id:++MAXID,name});
    res.status(201).json({"success":true,"msg":`${name} added succesfully`});
})
app.post('/login',(req,res)=>{
    console.log(req.body);
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});