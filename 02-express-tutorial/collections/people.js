//jshint esversion:6
let {people} = require('../data.js');


const getPeople = (req,res)=>{
    res.status(200).json({'success':true,'data':people});
};

const postPeople = (req,res)=>{
    // console.log(req.body);
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'});
    }
    res.status(201).send({success:true,person:name});
};

const postPostmanPeople = (req,res)=>{
    const {name} = req.body;
    if(!name){
        return res.status(400).json({success:false,msg:'please provide name value'});
    }
    res.status(201).send({success:true,data:[...people]});
};

const putPeople = (req,res)=>{
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
};

const deletePeople = (req,res)=>{
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
};

module.exports = {
	getPeople,
	postPeople,
	postPostmanPeople,
	putPeople,
	deletePeople,
};
