const express = require("express");
const app = express();
let { people } = require("../data");
const PORT = 5000;
const {StatusCodes} = require('http-status-codes');

let MAXID = 0;
people.every((v) => {
  MAXID = MAXID > Number(v.id) ? MAXID : Number(v.id);
});
//server static files from the folder
app.use(express.static("./methods-public-clone/"));
//parse urlEncodedObjects
app.use(express.urlencoded({ extended: false }));
//parse json objects sent by the javascript form
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  people.push({ id: ++MAXID, name });
  res.status(201).json({ success: true, msg: `${name} added succesfully` });
});
app.post("/login", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  people.push({ id: ++MAXID, name });
  res.status(201).send(`Hi ${name}`);
});
app.get("/api/postman/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.put("/api/people/:ID", (req, res) => {
  const { ID } = req.params;
  const { name } = req.query;
  if (!name) {
    return res
      .status(400)
      .send({ success: false, msg: "please provide a valid name" });
  }
  let found = people.find((person) => person.id === Number(ID));
  if (found) {
    people.map((person) => {
      if (person.id === Number(ID)) {
        person.name = name;
      }
    });
    return res.status(200).send({success:true,msg:`name with ID ${ID} modified to ${name}`});
  }
  res.status(StatusCodes.BAD_REQUEST).send({success:false,msg:"please provide valid id"});

});
app.delete("/api/people/:ID",(req,res)=>{
  const {ID} = req.params;
  let prevLength = people.length;
  people = people.filter((person)=>{
    return (!(person.id === Number(ID)));
});
if(prevLength>people.length){
  return res.status(200).send({success:true,msg:`person with id ${ID} deleted succesfully`});
}
res.status(400).send({success:false,msg:`please provide valid id`})
})

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
