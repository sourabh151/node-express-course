//jshint esversion:10

const notFound = (req,res)=>res.status(404).send('Route does not exist');
//this middleware will handle all the unhandled requests
module.exports = notFound;