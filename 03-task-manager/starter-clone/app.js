const express = require('express');
const app = express();

app.use(express.static("./public"));
app.use(express.json());

app.get('/api/v1/tasks',(req,res)=>{
    res.status(200).send([{id:1,name:'wash dishes',completed : true},{id:2,name:'wash clothes',completed:false}]);
})
app.post('/api/v1/tasks',(req,res)=>{
    const {name} = req.body;
    console.log(name);
    res.status(200).json({success:true,name:name});
})
app.listen(5000,()=>{
    console.log("listening on port 5000");
})