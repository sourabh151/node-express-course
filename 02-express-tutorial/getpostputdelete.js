//jshint esversion:10
//7:50
const express = require('express');

const app = express();
let {people} = require('./data');

app.use(express.static('./methods-public'));

//urlencoded is used when data is sent using the
//default form submission
app.use(express.urlencoded({extended:true}));

//json is used when sending data using javascript
app.use(express.json());
//get method
app.get('/api/people',(req,res)=>{
    res.status(200).json({'success':true,'data':people});
});
app.post('/api/people',(req,res)=>{
    // console.log(req.body);
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'});
    }
    res.status(201).send({success:true,person:name});
});
app.post('/api/postman/people',(req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'});
    }
    res.status(201).send({success:true,data:[...people]});
});
app.post('/login',(req,res)=>{
    // console.log('in post');
    const {name} = req.body;
    for(let person of people){
        if(name === person.name){
            return res.send('welcome '+name);
        }
    }
    res.status(401).send('not authorized');
});

//post method



//put method
app.put('/api/people/:id',(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    
    const where = people.find((person)=>{
        return person.id === Number(id);
    });
    if(!where){
        return res.status(404).json({success:false,msg:`no person with id ${id}`});
    }
    if(!name){
        return res.status(404).json({success:false,msg:'please provide name value'});
    }
    const updatedPeople = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name;
        }
        return person;
    });
    res.status(200).json({success:true,data:updatedPeople});
});
app.delete('/api/people/:id',(req,res)=>{
    const {id} = req.params;
    const where = people.find((person)=>{
        return person.id === Number(id);
    });
    if(!where){
        return res.status(404).json({success:false,msg:`no person with id ${id}`});
    }
    // console.log(typeof(where.id));
    const updatedPeople = people.filter((person)=>{
        if(person.id === Number(id)){
            return false;
        }
        return true;
    });
    res.status(200).json({success:true,data:updatedPeople});
});


app.listen(3000);